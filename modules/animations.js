// modules/animations.js - 动画效果工具

export const animations = {
    // 属性变化动画
    animateAttributeChange: function(element, oldValue, newValue, duration = 500) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数使动画更自然
            const easeProgress = this.easeOutQuad(progress);
            const current = Math.floor(oldValue + (newValue - oldValue) * easeProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // 淡入效果
    fadeIn: function(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // 淡出效果
    fadeOut: function(element, duration = 300) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = 1 - progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    },

    // 缓动函数
    easeOutQuad: function(t) {
        return t * (2 - t);
    },

    // 标签添加动画
    animateTagAdd: function(element) {
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.transition = 'all 0.3s ease-out';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 50);
    },

    // 标签移除动画
    animateTagRemove: function(element, callback) {
        element.style.transition = 'all 0.3s ease-in';
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';
        
        setTimeout(callback, 300);
    },

    // 事件切换动画
    animateEventTransition: function(oldEvent, newEvent, container) {
        this.fadeOut(oldEvent, 200, () => {
            oldEvent.remove();
            this.fadeIn(newEvent, 200);
        });
    }
}; 