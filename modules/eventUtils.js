// modules/eventUtils.js - 事件处理工具函数

const eventUtils = {
    /**
     * 处理条件结果
     * @param {Object} player - 玩家对象 
     * @param {Array} conditionalResults - 条件结果数组
     * @returns {Object|null} 匹配的结果或 null
     */
    handleConditionalResults(player, conditionalResults) {
        if (!conditionalResults || !Array.isArray(conditionalResults)) {
            return null;
        }
        
        // 按优先级排序
        const sortedResults = [...conditionalResults].sort((a, b) => 
            (b.priority || 0) - (a.priority || 0)
        );
        
        // 查找第一个匹配的结果
        for (const item of sortedResults) {
            if (this.checkCondition(player, item.condition)) {
                return item.result;
            }
        }
        
        return null;
    },
    
    /**
     * 检查条件是否满足
     * @param {Object} player - 玩家对象
     * @param {Object} condition - 条件对象
     * @returns {boolean} 条件是否满足
     */
    checkCondition(player, condition) {
        if (!condition) return true;
        
        // 使用 tagUtils 如果存在
        if (window.tagUtils && window.tagUtils.checkCondition) {
            return window.tagUtils.checkCondition(player, condition);
        }
        
        // 否则使用内置逻辑
        // 检查 tags 条件
        if (condition.tags && !condition.tags.every(tag => player.tags.includes(tag))) {
            return false;
        }
        
        // 检查 required_tags 条件
        if (condition.required_tags && 
            !condition.required_tags.every(tag => player.tags.includes(tag))) {
            return false;
        }
        
        // 检查 excluded_tags 条件
        if (condition.excluded_tags && 
            condition.excluded_tags.some(tag => player.tags.includes(tag))) {
            return false;
        }
        
        // 检查 attributes 条件
        if (condition.attributes) {
            for (const [attr, value] of Object.entries(condition.attributes)) {
                if (player[attr] < value) return false;
            }
        }
        
        // 检查 age_range 条件
        if (condition.age_range && 
            (player.age < condition.age_range[0] || player.age > condition.age_range[1])) {
            return false;
        }
        
        return true;
    },
    
    /**
     * 应用事件效果到玩家
     * @param {Object} player - 玩家对象
     * @param {Object} effects - 效果对象
     * @returns {Object} 更新后的玩家对象
     */
    applyEffects(player, effects) {
        if (!effects) return player;
        
        const updatedPlayer = { ...player };
        
        // 应用属性变化
        for (const [attr, value] of Object.entries(effects)) {
            if (typeof updatedPlayer[attr] === 'number') {
                updatedPlayer[attr] += value;
            }
        }
        
        return updatedPlayer;
    },
    
    /**
     * 应用标签变化
     * @param {Object} player - 玩家对象
     * @param {Array} addTags - 要添加的标签
     * @param {Array} removeTags - 要移除的标签
     * @returns {Object} 更新后的玩家对象
     */
    applyTags(player, addTags = [], removeTags = []) {
        const updatedTags = player.tags.filter(tag => !removeTags.includes(tag));
        
        // 添加新标签，避免重复
        addTags.forEach(tag => {
            if (!updatedTags.includes(tag)) {
                updatedTags.push(tag);
            }
        });
        
        return {
            ...player,
            tags: updatedTags
        };
    }
};

// 暴露给全局
window.eventUtils = eventUtils;
