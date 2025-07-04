// modules/storageUtils.js - 存储工具函数

const storageUtils = {
    /**
     * 保存数据到本地存储
     * @param {string} key - 存储键名
     * @param {*} data - 要存储的数据
     * @returns {boolean} 是否保存成功
     */
    save(key, data) {
        try {
            const compressed = this.compress(JSON.stringify(data));
            localStorage.setItem(key, compressed);
            return true;
        } catch (e) {
            console.error(`Storage save error for key ${key}:`, e);
            
            if (e.name === 'QuotaExceededError') {
                // 清理旧数据并重试
                this.cleanup();
                try {
                    const compressed = this.compress(JSON.stringify(data));
                    localStorage.setItem(key, compressed);
                    return true;
                } catch (err) {
                    console.error('Retry save failed:', err);
                    return false;
                }
            }
            return false;
        }
    },
    
    /**
     * 从本地存储加载数据
     * @param {string} key - 存储键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 加载的数据或默认值
     */
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return defaultValue;
            
            return JSON.parse(this.decompress(data));
        } catch (e) {
            console.error(`Storage load error for key ${key}:`, e);
            return defaultValue;
        }
    },
    
    /**
     * 简单的数据压缩
     * @param {string} str - 要压缩的字符串
     * @returns {string} 压缩后的字符串
     */
    compress(str) {
        // 简单的压缩策略：移除多余的空白字符
        return str.replace(/\s+/g, ' ').trim();
    },
    
    /**
     * 数据解压缩
     * @param {string} str - 要解压缩的字符串
     * @returns {string} 解压缩后的字符串
     */
    decompress(str) {
        // 简单的压缩策略不需要特殊解压
        return str;
    },
    
    /**
     * 清理旧数据以释放空间
     */
    cleanup() {
        try {
            const keysToPreserve = window.GAME_CONSTANTS?.STORAGE_KEYS 
                ? Object.values(window.GAME_CONSTANTS.STORAGE_KEYS) 
                : [];
            
            // 保留必要数据，清理其他数据
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!keysToPreserve.includes(key)) {
                    localStorage.removeItem(key);
                }
            }
            
            // 如果存在 savedLives，保留最新的 10 条记录
            const savedLivesKey = window.GAME_CONSTANTS?.STORAGE_KEYS?.SAVED_LIVES;
            if (savedLivesKey) {
                const lives = this.load(savedLivesKey, []);
                if (lives.length > 10) {
                    lives.splice(0, lives.length - 10);
                    this.save(savedLivesKey, lives);
                }
            }
        } catch (e) {
            console.error('Storage cleanup error:', e);
        }
    }
};

// 暴露给全局
window.storageUtils = storageUtils;
