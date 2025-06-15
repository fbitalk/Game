// eventManager.js - 修复版事件管理系统

// 直接使用全局变量，不声明
const tagDefinitions = window.TAG_DEFINITIONS || {};
const tagEvents = window.TAG_EVENTS || {};
// 使用已存在的 ageEvents，不重新声明
// const ageEvents = window.ageEvents;
const startEvents = window.STARTING_EVENTS || {};

const eventManager = {
    // 直接暴露事件数据
    ageEvents: window.ageEvents,
    tagEvents,
    startEvents,
    
    // 添加新属性
    triggered_events: new Set(), // 追踪已触发的事件
    eventIndex: new Map(), // 事件索引

    // 错误处理
    errorHandlers: {
        showError: (message) => {
            console.error(message);
            // 可以在这里添加UI显示错误的逻辑
        },
        logError: (error, context) => {
            console.error(`Error in ${context}:`, error);
            // 可以在这里添加错误上报逻辑
        }
    },

    // 使用导入的标签定义
    tag_definitions: tagDefinitions,

    // 初始化事件索引
    initializeEventIndex() {
        try {
            // 清空索引
            this.eventIndex.clear();
            
            // 添加标签事件 - 确保使用正确的变量名
            if (window.TAG_EVENTS) {
                Object.entries(window.TAG_EVENTS).forEach(([id, event]) => {
                    this.eventIndex.set(id, event);
                    console.log(`Added tag event: ${id}`); // 调试信息
                });
                console.log(`Loaded ${Object.keys(window.TAG_EVENTS).length} tag events`);
            } else {
                console.error('TAG_EVENTS not found!');
            }

            // 添加年龄段事件
            if (this.ageEvents) {
                Object.entries(this.ageEvents).forEach(([ageGroup, events]) => {
                    Object.entries(events).forEach(([id, event]) => {
                        this.eventIndex.set(id, event);
                    });
                });
                console.log(`Loaded age events for ${Object.keys(this.ageEvents).length} age groups`);
            }

            // 添加开局事件
            if (window.STARTING_EVENTS) {
                Object.entries(window.STARTING_EVENTS).forEach(([id, event]) => {
                    this.eventIndex.set(id, event);
                });
                console.log(`Loaded ${Object.keys(window.STARTING_EVENTS).length} starting events`);
            }

            // 添加开局标签事件
            if (window.STARTING_TAG_EVENTS) {
                Object.entries(window.STARTING_TAG_EVENTS).forEach(([id, event]) => {
                    this.eventIndex.set(id, event);
                });
            }

            console.log('Event index initialized successfully');
            console.log(`Total events in index: ${this.eventIndex.size}`);
            
            // 调试：检查小学生相关事件是否被加载
            const elementaryEvents = Array.from(this.eventIndex.keys()).filter(key => 
                key.includes('elementary')
            );
            console.log(`Elementary school events loaded: ${elementaryEvents.length}`, elementaryEvents);
            
            // 调试：检查是否有小学生标签的事件
            const studentTagEvents = [];
            this.eventIndex.forEach((event, id) => {
                if (event.trigger_conditions?.required_tags?.includes('小学生')) {
                    studentTagEvents.push(id);
                }
            });
            console.log(`Events requiring 小学生 tag: ${studentTagEvents.length}`, studentTagEvents);
            
        } catch (error) {
            this.errorHandlers.logError(error, 'initializeEventIndex');
            throw error;
        }
    },

    // 获取事件
    getEvent(eventId) {
        const event = this.eventIndex.get(eventId);
        if (!event) {
            console.warn(`Event not found: ${eventId}`);
        }
        return event;
    },

    // 检查事件是否已触发
    isEventTriggered(eventId) {
        return this.triggered_events.has(eventId);
    },

    // 标记事件为已触发
    markEventAsTriggered(eventId) {
        this.triggered_events.add(eventId);
        console.log(`Event marked as triggered: ${eventId}`);
    },

    // 获取特定年龄段的事件
    getAgeEvents(ageGroup) {
        return this.ageEvents[ageGroup] || {};
    },

    // 获取开局事件
    getStartEvents() {
        return this.startEvents;
    },

    // 获取标签相关事件（改进版）
    getTagEvents(tag) {
        const events = {};
        
        console.log(`Getting events for tag: ${tag}`); // 调试信息
        
        // 1. 从 TAG_EVENTS 中直接查找与该标签相关的事件
        if (window.TAG_EVENTS) {
            Object.entries(window.TAG_EVENTS).forEach(([eventId, event]) => {
                if (event.trigger_conditions && 
                    event.trigger_conditions.required_tags && 
                    event.trigger_conditions.required_tags.includes(tag)) {
                    events[eventId] = event;
                    console.log(`Found event ${eventId} for tag ${tag}`); // 调试信息
                }
            });
        } else {
            console.error('TAG_EVENTS not available when getting tag events');
        }
        
        // 2. 从标签定义中获取指定的事件
        const tagDef = this.tag_definitions[tag] || this.tag_definitions.get?.(tag);
        if (tagDef) {
            console.log(`Found tag definition for ${tag}`, tagDef); // 调试信息
            
            // 处理优先事件
            if (tagDef.priority_events) {
                tagDef.priority_events.forEach(eventId => {
                    const event = this.getEvent(eventId);
                    if (event) {
                        events[eventId] = event;
                        console.log(`Added priority event ${eventId} for tag ${tag}`);
                    } else {
                        console.warn(`Priority event not found: ${eventId} for tag: ${tag}`);
                    }
                });
            }
            
            // 处理独占事件
            if (tagDef.exclusive_events) {
                tagDef.exclusive_events.forEach(eventId => {
                    const event = this.getEvent(eventId);
                    if (event) {
                        events[eventId] = event;
                        console.log(`Added exclusive event ${eventId} for tag ${tag}`);
                    } else {
                        console.warn(`Exclusive event not found: ${eventId} for tag: ${tag}`);
                    }
                });
            }
        } else {
            console.log(`No tag definition found for ${tag}`);
        }

        console.log(`Total found ${Object.keys(events).length} events for tag: ${tag}`);
        return events;
    },

    // 检查事件条件
    checkEventConditions(event, eventId, player) {
        if (!event || !event.trigger_conditions) return true;
        
        const conditions = event.trigger_conditions;
        
        // 检查年龄范围
        if (conditions.age_range && 
            (player.age < conditions.age_range[0] || 
             player.age > conditions.age_range[1])) {
            console.log(`Event ${eventId} failed age check: player age ${player.age}, required ${conditions.age_range}`);
            return false;
        }
        
        // 检查必需标签
        if (conditions.required_tags && conditions.required_tags.length > 0) {
            const hasAllTags = conditions.required_tags.every(tag => 
                player.tags.includes(tag)
            );
            if (!hasAllTags) {
                console.log(`Event ${eventId} requires tags: ${conditions.required_tags}, player has: ${player.tags}`);
                return false;
            }
        }
        
        // 检查排除标签
        if (conditions.excluded_tags && conditions.excluded_tags.length > 0) {
            const hasExcludedTag = conditions.excluded_tags.some(tag => 
                player.tags.includes(tag)
            );
            if (hasExcludedTag) {
                console.log(`Event ${eventId} excluded due to tags`);
                return false;
            }
        }
        
        // 检查属性要求
        if (conditions.min_attributes) {
            for (const [attr, minValue] of Object.entries(conditions.min_attributes)) {
                if (player[attr] < minValue) {
                    console.log(`Event ${eventId} requires ${attr} >= ${minValue}, player has ${player[attr]}`);
                    return false;
                }
            }
        }
        
        return true;
    },
    
    /**
     * 更新动态标签
     * @param {Object} player - 玩家对象
     * @param {string} tagPrefix - 标签前缀，如 "学习成绩:"
     * @param {number} change - 变化值，正数为增加，负数为减少
     * @param {string} resultText - 返回给玩家的文本，可包含 {user} 占位符
     * @param {number[]} [range] - 可选的标签值范围限制 [min, max]
     * @returns {Object} 标准的事件结果对象
     */
    updateDynamicTag(player, tagPrefix, change, resultText, range = [-10, 10]) {
        // 使用 tagUtils 如果存在
        if (window.tagUtils && window.tagUtils.updateDynamicTag) {
            return window.tagUtils.updateDynamicTag(player, tagPrefix, change, resultText, range);
        }
        
        // 否则使用内置实现
        // 查找现有标签
        const existingTag = player.tags.find(tag => tag.startsWith(tagPrefix));
        
        // 获取当前值
        let currentValue = 0;
        if (existingTag) {
            const parts = existingTag.split(":");
            if (parts.length > 1) {
                currentValue = parseInt(parts[1]) || 0;
            }
        }
        
        // 计算新值并限制范围
        const newValue = Math.max(range[0], Math.min(range[1], currentValue + change));
        
        // 过滤掉现有标签并创建新标签列表
        const newTags = player.tags.filter(tag => !tag.startsWith(tagPrefix));
        newTags.push(`${tagPrefix}${newValue}`);
        
        // 返回标准事件结果对象
        return {
            result: resultText,
            effects: {},
            add_tags: newTags,
            remove_tags: existingTag ? [existingTag] : []
        };
    }
};

// 初始化事件索引
eventManager.initializeEventIndex();

// 暴露到全局
window.eventManager = eventManager;