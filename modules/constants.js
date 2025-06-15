// modules/constants.js - 游戏常量定义

const GAME_CONSTANTS = {
    // 属性限制
    MAX_ATTRIBUTE: 100,
    MAX_MONEY: 9999,
    MAX_AGE: 110,
    MAX_HEALTH: 100,
    
    // 错误消息
    ERROR_MESSAGES: {
        EVENT_NOT_FOUND: "事件未找到",
        TAG_NOT_FOUND: "标签未找到",
        INVALID_PLAYER: "无效的玩家数据",
        INIT_FAILED: "初始化失败",
        INVALID_EVENT: "无效的事件数据",
        INVALID_TAG: "无效的标签数据"
    },
    
    // 年龄段定义
    AGE_GROUPS: {
        BABY: { min: 0, max: 0 },
        TODDLER: { min: 1, max: 5 },
        CHILDHOOD: { min: 6, max: 12 },
        TEENAGER: { min: 13, max: 18 },
        ADULT: { min: 19, max: 30 },
        MIDDLE_AGE: { min: 31, max: 50 },
        ELDERLY: { min: 51, max: 999 }
    },
    
    // 标签类型
    TAG_TYPES: {
        DYNAMIC: 'dynamic',
        STATIC: 'static',
        RED: 'red',
        BLUE: 'blue',
        GREEN: 'green'
    },
    
    // 事件类型
    EVENT_TYPES: {
        STARTING: 'starting',
        TAG: 'tag',
        AGE: 'age',
        RANDOM: 'random'
    },
    
    // 属性类型
    ATTRIBUTE_TYPES: {
        MONEY: 'money',
        HEALTH: 'health',
        INTELLIGENCE: 'intelligence',
        SOCIAL: 'social',
        LUCK: 'luck'
    }
};

// 暴露到全局
window.GAME_CONSTANTS = GAME_CONSTANTS; 