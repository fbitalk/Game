// modules/keyboard.js - 键盘快捷键管理

export const keyboardManager = {
    // 快捷键映射
    shortcuts: new Map(),
    
    // 初始化快捷键
    init: function() {
        // 数字键 1-9 用于选择选项
        for (let i = 1; i <= 9; i++) {
            this.registerShortcut(i.toString(), () => {
                const optionIndex = i - 1;
                const options = document.querySelectorAll('.option-btn');
                if (optionIndex < options.length) {
                    options[optionIndex].click();
                }
            });
        }
        
        // 空格键用于继续
        this.registerShortcut('space', () => {
            const continueBtn = document.querySelector('.continue-btn');
            if (continueBtn) {
                continueBtn.click();
            }
        });
        
        // ESC键用于返回
        this.registerShortcut('escape', () => {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                backBtn.click();
            }
        });
        
        // 添加键盘事件监听
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    },
    
    // 注册快捷键
    registerShortcut: function(key, callback) {
        this.shortcuts.set(key, callback);
    },
    
    // 处理按键事件
    handleKeyPress: function(event) {
        const key = event.key.toLowerCase();
        const callback = this.shortcuts.get(key);
        
        if (callback) {
            event.preventDefault();
            callback();
        }
    },
    
    // 显示快捷键提示
    showShortcutHints: function() {
        const options = document.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            const shortcut = (index + 1).toString();
            const hint = document.createElement('span');
            hint.className = 'shortcut-hint';
            hint.textContent = shortcut;
            option.appendChild(hint);
        });
    },
    
    // 清理快捷键
    cleanup: function() {
        document.removeEventListener('keydown', this.handleKeyPress.bind(this));
        this.shortcuts.clear();
    }
}; 