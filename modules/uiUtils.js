// modules/uiUtils.js - UI渲染工具函数

const uiUtils = {
    // 待处理的UI更新队列
    pendingUpdates: [],
    
    // 是否有待处理的更新
    isPending: false,
    
    /**
     * 将UI更新添加到队列
     * @param {Function} updateFn - 更新函数，接收一个DocumentFragment参数
     */
    queueUpdate(updateFn) {
        this.pendingUpdates.push(updateFn);
        
        // 如果没有待处理的刷新，请求动画帧
        if (!this.isPending) {
            this.isPending = true;
            requestAnimationFrame(() => this.flush());
        }
    },
    
    /**
     * 执行所有待处理的更新
     */
    flush() {
        const updates = [...this.pendingUpdates];
        this.pendingUpdates = [];
        this.isPending = false;
        
        // 批处理更新
        if (updates.length === 0) return;
        
        // 分组更新，按照目标元素分组
        const updatesByTarget = {};
        
        updates.forEach(update => {
            const targetId = update.targetId || 'default';
            if (!updatesByTarget[targetId]) {
                updatesByTarget[targetId] = [];
            }
            updatesByTarget[targetId].push(update);
        });
        
        // 对每个目标执行批量更新
        Object.entries(updatesByTarget).forEach(([targetId, targetUpdates]) => {
            // 跳过默认分组
            if (targetId === 'default') return;
            
            const target = document.getElementById(targetId);
            if (!target) return;
            
            const fragment = document.createDocumentFragment();
            targetUpdates.forEach(update => update.fn(fragment));
            target.appendChild(fragment);
        });
        
        // 处理默认分组的更新
        if (updatesByTarget.default) {
            updatesByTarget.default.forEach(update => update.fn());
        }
    },
    
    /**
     * 创建带有指定属性的HTML元素
     * @param {string} tag - 标签名
     * @param {Object} attrs - 属性
     * @param {string|Node} [content] - 内容
     * @returns {HTMLElement} 创建的元素
     */
    createElement(tag, attrs = {}, content = null) {
        const element = document.createElement(tag);
        
        // 设置属性
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.entries(value).forEach(([prop, val]) => {
                    element.style[prop] = val;
                });
            } else if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else if (key === 'dataset' && typeof value === 'object') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // 设置内容
        if (content !== null) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else {
                element.appendChild(content);
            }
        }
        
        return element;
    },
    
    /**
     * 高效地更新标签列表
     * @param {HTMLElement} container - 标签容器元素
     * @param {Array} tags - 标签数组
     */
    renderTags(container, tags) {
        this.queueUpdate({
            targetId: container.id,
            fn: (fragment) => {
                // 创建所有标签元素
                tags.forEach(tag => {
                    const tagElement = this.createElement('div', { className: 'tag' }, `#${tag}`);
                    
                    // 应用特殊样式
                    if (typeof eventManager !== 'undefined' && eventManager.tag_definitions) {
                        const tagDef = eventManager.tag_definitions.get(tag);
                        if (tagDef?.is_red) {
                            tagElement.classList.add('red');
                        }
                    }
                    
                    // 检查成就系统
                    if (typeof achievementManager !== 'undefined') {
                        const achievement = achievementManager.getAchievementByTag(tag);
                        if (achievement?.golden) {
                            tagElement.classList.add('golden');
                        }
                    }
                    
                    fragment.appendChild(tagElement);
                });
                
                // 清空容器并添加新元素
                container.innerHTML = '';
                container.appendChild(fragment);
            }
        });
    },
    
    /**
     * 为多个元素添加事件委托
     * @param {string} containerSelector - 容器选择器
     * @param {string} childSelector - 子元素选择器
     * @param {string} eventType - 事件类型
     * @param {Function} handler - 事件处理函数
     */
    addEventDelegation(containerSelector, childSelector, eventType, handler) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        container.addEventListener(eventType, (event) => {
            let target = event.target;
            
            // 查找匹配的目标元素
            while (target && target !== container) {
                if (target.matches(childSelector)) {
                    handler(event, target);
                    return;
                }
                target = target.parentElement;
            }
        });
    },
    
    /**
     * 显示错误消息
     * @param {string} message - 错误消息 
     * @param {number} [duration=3000] - 显示持续时间（毫秒）
     */
    showErrorMessage(message, duration = 3000) {
        const toast = this.createElement('div', {
            className: 'error-toast',
            style: {
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#ff5555',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                zIndex: '1000',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }
        }, message);
        
        document.body.appendChild(toast);
        
        // 淡出动画
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, duration);
    }
};

// 暴露给全局
window.uiUtils = uiUtils;
