// modules/player.js - 玩家类

export class Player {
    constructor(data) {
        this.name = data.name;
        this.gender = data.gender;
        this.age = 0;
        this.background = data.background;
        this.deathReason = null;
        
        // 基础属性
        this.attributes = {
            money: 50,
            health: 80,
            intelligence: 70,
            social: 70,
            luck: 70
        };
        
        // 使用Set存储标签，避免重复
        this.tags = new Set();
        
        // 历史记录
        this.history = [];
        
        // 初始化标签
        if (data.tags) {
            data.tags.forEach(tag => this.addTag(tag));
        }
    }
    
    // 添加标签
    addTag(tag) {
        this.tags.add(tag);
        return this;
    }
    
    // 移除标签
    removeTag(tag) {
        this.tags.delete(tag);
        return this;
    }
    
    // 检查是否有标签
    hasTag(tag) {
        return this.tags.has(tag);
    }
    
    // 检查是否有任意一个标签
    hasAnyTag(tags) {
        return tags.some(tag => this.tags.has(tag));
    }
    
    // 检查是否有所有标签
    hasAllTags(tags) {
        return tags.every(tag => this.tags.has(tag));
    }
    
    // 修改属性
    modifyAttribute(attr, value) {
        if (!(attr in this.attributes)) return this;
        
        this.attributes[attr] = Math.max(0, this.attributes[attr] + value);
        
        if (attr !== 'money') {
            this.attributes[attr] = Math.min(100, this.attributes[attr]);
        } else {
            this.attributes[attr] = Math.min(9999, this.attributes[attr]);
        }
        
        return this;
    }
    
    // 增加年龄
    increaseAge() {
        this.age++;
        return this;
    }
    
    // 记录历史
    addHistory(event) {
        this.history.push({
            ...event,
            age: this.age
        });
        return this;
    }
    
    // 获取所有标签
    getAllTags() {
        return Array.from(this.tags);
    }
    
    // 获取属性值
    getAttribute(attr) {
        return this.attributes[attr] || 0;
    }
    
    // 检查是否满足属性要求
    meetsAttributeRequirement(attr, value) {
        return this.getAttribute(attr) >= value;
    }
    
    // 检查是否满足所有属性要求
    meetsAllAttributeRequirements(requirements) {
        return Object.entries(requirements).every(
            ([attr, value]) => this.meetsAttributeRequirement(attr, value)
        );
    }
    
    // 获取玩家数据
    toJSON() {
        return {
            name: this.name,
            gender: this.gender,
            age: this.age,
            background: this.background,
            deathReason: this.deathReason,
            attributes: { ...this.attributes },
            tags: this.getAllTags(),
            history: [...this.history]
        };
    }
    
    // 从JSON恢复玩家数据
    static fromJSON(data) {
        const player = new Player({
            name: data.name,
            gender: data.gender,
            background: data.background
        });
        
        player.age = data.age;
        player.deathReason = data.deathReason;
        player.attributes = { ...data.attributes };
        player.history = [...data.history];
        
        data.tags.forEach(tag => player.addTag(tag));
        
        return player;
    }
} 