// modules/moduleLoader.js - 模块加载器

const moduleLoader = {
    /**
     * 需要加载的模块
     */
    modules: [
        { name: 'tagUtils', path: 'modules/tagUtils.js' },
        { name: 'eventUtils', path: 'modules/eventUtils.js' },
        { name: 'storageUtils', path: 'modules/storageUtils.js' },
        { name: 'uiUtils', path: 'modules/uiUtils.js' }
    ],
    
    /**
     * 已加载的模块
     */
    loadedModules: {},
    
    /**
     * 加载所有模块
     * @returns {Promise} 加载完成的Promise
     */
    loadAllModules() {
        const promises = this.modules.map(module => this.loadModule(module));
        return Promise.all(promises)
            .then(() => {
                console.log('All modules loaded successfully');
                return this.loadedModules;
            })
            .catch(error => {
                console.error('Failed to load modules:', error);
                throw error;
            });
    },
    
    /**
     * 加载单个模块
     * @param {Object} module - 模块配置对象
     * @returns {Promise} 加载完成的Promise
     */
    loadModule(module) {
        return new Promise((resolve, reject) => {
            // 检查模块是否已加载到全局
            if (window[module.name]) {
                console.log(`Module ${module.name} already loaded`);
                this.loadedModules[module.name] = window[module.name];
                resolve(window[module.name]);
                return;
            }
            
            // 创建脚本元素
            const script = document.createElement('script');
            script.src = module.path;
            script.async = true;
            
            // 加载成功处理
            script.onload = () => {
                console.log(`Module ${module.name} loaded successfully`);
                this.loadedModules[module.name] = window[module.name];
                resolve(window[module.name]);
            };
            
            // 加载失败处理
            script.onerror = (error) => {
                console.error(`Failed to load module ${module.name}:`, error);
                reject(error);
            };
            
            // 添加到文档
            document.head.appendChild(script);
        });
    },
    
    /**
     * 检查模块是否已加载
     * @param {string} moduleName - 模块名称
     * @returns {boolean} 是否已加载
     */
    isModuleLoaded(moduleName) {
        return !!this.loadedModules[moduleName];
    }
};

// 暴露到全局
window.moduleLoader = moduleLoader; 