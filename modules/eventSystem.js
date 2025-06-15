// modules/eventSystem.js - 事件系统

import { GAME_CONSTANTS } from './constants.js';
import { ConditionChecker } from './conditionChecker.js';

export class EventSystem {
    constructor() {
        this.events = new Map();
        this.triggeredEvents = new Set();
        this.eventIndex = new Map();
        this.tagDefinitions = new Map();
        this.initialized = false;
    }
    
    // 初始化事件索引
    initEventIndex() {
        try {
            this.eventIndex.clear();
            
            const addToIndex = (events) => {
                if (!events) return;
                
                for (const [id, event] of Object.entries(events)) {
                    if (event && typeof event === 'object') {
                        this.eventIndex.set(id, event);
                    }
                }
            };
            
            // 添加所有事件类型到索引
            addToIndex(this.events);
            
            console.log(`Event index created with ${this.eventIndex.size} events`);
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize event index:', error);
            throw error;
        }
    }
    
    // 添加事件
    addEvent(id, event) {
        if (!id || !event) {
            throw new Error(GAME_CONSTANTS.ERROR_MESSAGES.INVALID_EVENT);
        }
        
        this.events.set(id, event);
        this.eventIndex.set(id, event);
        return this;
    }
    
    // 获取事件
    getEvent(id) {
        if (!this.initialized) {
            this.initEventIndex();
        }
        
        const event = this.eventIndex.get(id);
        if (!event) {
            console.warn(`Event not found: ${id}`);
            return null;
        }
        return event;
    }
    
    // 标记事件为已触发
    markEventTriggered(id) {
        this.triggeredEvents.add(id);
        return this;
    }
    
    // 检查事件是否已触发
    isEventTriggered(id) {
        return this.triggeredEvents.has(id);
    }
    
    // 获取可用事件
    getAvailableEvents(player, ageGroup) {
        if (!player) {
            throw new Error(GAME_CONSTANTS.ERROR_MESSAGES.INVALID_PLAYER);
        }
        
        const available = [];
        const checker = new ConditionChecker(player);
        
        // 0岁时只触发开局事件
        if (player.age === 0) {
            return null;
        }
        
        // 检查事件条件
        for (const [id, event] of this.events) {
            // 跳过已触发的事件
            if (this.triggeredEvents.has(id)) continue;
            
            if (checker.checkEventConditions(event.trigger_conditions)) {
                available.push([id, event]);
            }
        }
        
        return available;
    }
    
    // 选择事件
    selectEvent(availableEvents, player) {
        if (!availableEvents || availableEvents.length === 0) return null;
        
        const checker = new ConditionChecker(player);
        
        // 检查红色标签
        const redTags = player.getAllTags().filter(tag => 
            this.getTagDefinition(tag)?.is_red
        );
        
        if (redTags.length > 0) {
            // 只返回红色标签的独占事件
            for (const redTag of redTags) {
                const redExclusiveEvents = this.getTagDefinition(redTag)?.exclusive_events || [];
                for (const eventId of redExclusiveEvents) {
                    const found = availableEvents.find(e => e[0] === eventId);
                    if (found) return found;
                }
            }
            return null;
        }
        
        // 检查独占事件
        for (const tag of player.getAllTags()) {
            const tagDef = this.getTagDefinition(tag);
            if (tagDef?.exclusive_events) {
                for (const exclusiveEventId of tagDef.exclusive_events) {
                    const found = availableEvents.find(e => e[0] === exclusiveEventId);
                    if (found) return found;
                }
            }
        }
        
        // 检查优先事件
        const priorityEventIds = [];
        for (const tag of player.getAllTags()) {
            const tagDef = this.getTagDefinition(tag);
            if (tagDef?.priority_events) {
                priorityEventIds.push(...tagDef.priority_events);
            }
        }
        
        if (priorityEventIds.length > 0) {
            const weightedPriorityEvents = [];
            for (const priorityEventId of priorityEventIds) {
                const found = availableEvents.find(e => e[0] === priorityEventId);
                if (found) {
                    // 优先事件有更高的权重
                    for (let i = 0; i < 3; i++) {
                        weightedPriorityEvents.push(found);
                    }
                }
            }
            
            if (weightedPriorityEvents.length > 0) {
                const allWeighted = [...weightedPriorityEvents, ...availableEvents];
                return allWeighted[Math.floor(Math.random() * allWeighted.length)];
            }
        }
        
        // 随机选择
        return availableEvents[Math.floor(Math.random() * availableEvents.length)];
    }
    
    // 获取标签定义
    getTagDefinition(tag) {
        return this.tagDefinitions.get(tag) || null;
    }
    
    // 设置标签定义
    setTagDefinitions(definitions) {
        if (!definitions) {
            throw new Error(GAME_CONSTANTS.ERROR_MESSAGES.INVALID_TAG);
        }
        
        this.tagDefinitions = new Map(definitions);
        return this;
    }
    
    // 更新动态标签
    updateDynamicTag(player, tagPrefix, change, resultText) {
        try {
            if (!player || !player.tags) {
                throw new Error(GAME_CONSTANTS.ERROR_MESSAGES.INVALID_PLAYER);
            }
            
            const existingTag = player.tags.find(tag => tag.startsWith(tagPrefix));
            const currentValue = existingTag ? parseInt(existingTag.split(':')[1]) || 0 : 0;
            const newValue = Math.max(0, Math.min(currentValue + change, GAME_CONSTANTS.MAX_ATTRIBUTE));
            const newTag = `${tagPrefix}${newValue}`;
            
            return {
                result: resultText || `{user}的${tagPrefix}变化了`,
                effects: {},
                add_tags: [newTag],
                remove_tags: existingTag ? [existingTag] : []
            };
        } catch (error) {
            console.error('Failed to update dynamic tag:', error);
            return {
                result: "更新失败",
                effects: {},
                add_tags: [],
                remove_tags: []
            };
        }
    }
    
    // 清理事件系统
    cleanup() {
        this.events.clear();
        this.triggeredEvents.clear();
        this.eventIndex.clear();
        this.tagDefinitions.clear();
        this.initialized = false;
    }
} 