// modules/conditionChecker.js - 条件检查器

import { GAME_CONSTANTS } from './constants.js';

export class ConditionChecker {
    constructor(player) {
        this.player = player;
        this.tagSet = new Set(player.getAllTags());
    }
    
    // 检查年龄范围
    checkAgeRange(minAge, maxAge) {
        return this.player.age >= minAge && this.player.age <= maxAge;
    }
    
    // 检查必需标签
    checkRequiredTags(requiredTags) {
        if (!requiredTags || requiredTags.length === 0) return true;
        return requiredTags.every(tag => this.tagSet.has(tag));
    }
    
    // 检查排除标签
    checkExcludedTags(excludedTags) {
        if (!excludedTags || excludedTags.length === 0) return true;
        return !excludedTags.some(tag => this.tagSet.has(tag));
    }
    
    // 检查属性要求
    checkAttributeRequirements(requirements) {
        if (!requirements) return true;
        
        return Object.entries(requirements).every(([attr, value]) => {
            const currentValue = this.player.getAttribute(attr);
            return currentValue >= value;
        });
    }
    
    // 检查事件条件
    checkEventConditions(conditions) {
        if (!conditions) return true;
        
        // 检查年龄范围
        if (conditions.age_range) {
            if (!this.checkAgeRange(conditions.age_range[0], conditions.age_range[1])) {
                return false;
            }
        }
        
        // 检查必需标签
        if (!this.checkRequiredTags(conditions.required_tags)) {
            return false;
        }
        
        // 检查排除标签
        if (!this.checkExcludedTags(conditions.excluded_tags)) {
            return false;
        }
        
        // 检查属性要求
        if (!this.checkAttributeRequirements(conditions.min_attributes)) {
            return false;
        }
        
        return true;
    }
    
    // 检查标签条件
    checkTagConditions(tag, conditions) {
        if (!conditions) return true;
        
        // 检查标签是否存在
        if (!this.tagSet.has(tag)) {
            return false;
        }
        
        // 检查标签特定条件
        if (conditions.tag_specific) {
            const tagConditions = conditions.tag_specific[tag];
            if (tagConditions && !this.checkEventConditions(tagConditions)) {
                return false;
            }
        }
        
        return true;
    }
    
    // 检查组合条件
    checkCombinedConditions(conditions) {
        if (!conditions) return true;
        
        // 检查所有条件
        return conditions.every(condition => this.checkEventConditions(condition));
    }
} 