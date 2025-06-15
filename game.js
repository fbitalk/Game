// game.js - 修复版本

// 使用已存在的游戏常量，不重新声明
// const GAME_CONSTANTS = window.GAME_CONSTANTS;

// 游戏状态管理
class LifeSimulatorGame {
    constructor() {
        // 初始化事件管理器
        if (typeof eventManager !== 'undefined') {
            eventManager.initializeEventIndex();
        }
        
        this.gameState = 'menu'; // menu, creating, playing, gameover
        this.player = null;
        this.currentEvent = null;
        this.currentEventId = null;
        this.eventResult = null;
        this.gameHistory = [];
        this.deathReason = '';
        this.showResult = false;
        
        // 角色创建相关
        this.selectedGender = null;
        this.playerName = '';
        
        // 添加错误处理相关属性 - 移到前面，以便loadSavedLives可以使用
        this.errorHandlers = {
            showError: (message) => {
                console.error(message);
                alert(message);
            },
            logError: (error, context) => {
                console.error(`Error in ${context}:`, error);
            }
        };
        
        // 保存的人生记录
        this.savedLives = this.loadSavedLives();
    }

    // 优化的标签渲染函数
    renderTags(container, tags) {
        // 使用 uiUtils 如果存在
        if (typeof uiUtils !== 'undefined' && uiUtils.renderTags) {
            uiUtils.renderTags(container, tags);
            return;
        }
        
        // 否则使用内置实现
        const fragment = document.createDocumentFragment();
        
        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            
            // 检查 eventManager 是否存在
            if (typeof eventManager !== 'undefined' && eventManager.tag_definitions) {
                const tagDef = eventManager.tag_definitions[tag];
                if (tagDef?.is_red) {
                    tagElement.classList.add('red');
                }
            }
            
            // 检查成就系统
            if (typeof achievementManager !== 'undefined') {
                const achievement = achievementManager.getAchievementByTag(tag);
                if (achievement?.golden) tagElement.classList.add('golden');
            }
            
            tagElement.textContent = `#${tag}`;
            fragment.appendChild(tagElement);
        });
        
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    // 加载保存的人生记录
    loadSavedLives() {
        try {
            // 使用 storageUtils 如果存在
            if (typeof storageUtils !== 'undefined') {
                return storageUtils.load(
                    window.GAME_CONSTANTS.STORAGE_KEYS.SAVED_LIVES, 
                    []
                );
            }
            
            // 否则使用内置实现
            const savedData = localStorage.getItem(window.GAME_CONSTANTS.STORAGE_KEYS.SAVED_LIVES);
            if (!savedData) return [];
            
            const lives = JSON.parse(savedData);
            return Array.isArray(lives) ? lives : [];
        } catch (error) {
            this.errorHandlers.logError(error, "loadSavedLives");
            return [];
        }
    }

    // 保存人生记录
    saveLifeRecord() {
        try {
            const record = {
                id: Date.now(),
                name: this.player.name,
                gender: this.player.gender,
                age: this.player.age,
                background: this.player.background.name || this.player.background,
                tags: this.player.tags,
                deathReason: this.deathReason,
                history: this.gameHistory,
                date: new Date().toLocaleDateString()
            };

            this.savedLives.push(record);
            
            // 使用 storageUtils 如果存在
            if (typeof storageUtils !== 'undefined') {
                storageUtils.save(
                    window.GAME_CONSTANTS.STORAGE_KEYS.SAVED_LIVES, 
                    this.savedLives
                );
                return record;
            }
            
            // 否则使用内置实现
            localStorage.setItem(window.GAME_CONSTANTS.STORAGE_KEYS.SAVED_LIVES, JSON.stringify(this.savedLives));
            return record;
        } catch (error) {
            this.errorHandlers.logError(error, "saveLifeRecord");
            this.errorHandlers.showError(window.GAME_CONSTANTS.ERROR_MESSAGES.SAVE_FAILED);
        }
    }

    // 开始游戏
    startGame() {
        try {
            // 检查 STARTING_EVENTS 是否存在
            if (!window.STARTING_EVENTS) {
                console.error('STARTING_EVENTS not found');
                alert('游戏数据加载失败，请刷新页面');
                return;
            }

            // 从 STARTING_EVENTS 中随机选择一个开局事件
            const startEventKeys = Object.keys(window.STARTING_EVENTS);
            
            // 根据权重选择事件
            const weightedEvents = [];
            startEventKeys.forEach(key => {
                const event = window.STARTING_EVENTS[key];
                const weight = event.weight || 10;
                for (let i = 0; i < weight; i++) {
                    weightedEvents.push(key);
                }
            });
            
            const selectedEventKey = weightedEvents[Math.floor(Math.random() * weightedEvents.length)];
            const startEvent = window.STARTING_EVENTS[selectedEventKey];
            
            // 初始化玩家基础属性
            const baseAttributes = startEvent.effects || {
                money: 50,
                health: 80,
                intelligence: 70,
                social: 70,
                luck: 70
            };
            
            this.player = {
                name: this.playerName,
                gender: this.selectedGender,
                age: 0,
                background: { 
                    name: startEvent.title, 
                    description: startEvent.description.replace(/{user}/g, this.playerName) 
                },
                ...baseAttributes,
                tags: [this.selectedGender === 'male' ? '男性' : '女性'],
                alive: true
            };
            
            // 添加开局标签
            if (startEvent.add_tags) {
                this.player.tags.push(...startEvent.add_tags);
            }
            
            this.gameState = 'playing';
            this.gameHistory = [`0岁: ${startEvent.title}`];
            
            // 设置当前事件
            if (startEvent.options && startEvent.options.length > 0) {
                this.currentEvent = {
                    title: startEvent.title,
                    description: startEvent.description.replace(/{user}/g, this.playerName),
                    options: startEvent.options.map(option => ({
                        ...option,
                        text: option.text,
                        result: option.result ? option.result.replace(/{user}/g, this.playerName) : option.result
                    }))
                };
            } else {
                // 如果没有选项，使用默认选项
                this.currentEvent = {
                    title: startEvent.title,
                    description: startEvent.description.replace(/{user}/g, this.playerName),
                    options: [{
                        text: "开始人生",
                        result: "新的人生开始了...",
                        effects: {}
                    }]
                };
            }
            
            // 检查是否有后续事件
            if (startEvent.continue_event) {
                this.currentEventId = selectedEventKey;
            }
            
            this.showResult = false;
            this.eventResult = null;
            
            this.updateDisplay();
            
        } catch (error) {
            console.error('Error in startGame:', error);
            alert("游戏启动失败，请刷新页面重试");
        }
    }

    // 生成事件
    generateEvent() {
        console.log(`Generating event for age ${this.player.age}, tags: ${this.player.tags.join(', ')}`);
        
        // 获取当前年龄段
        let ageGroup = null;
        if (this.player.age >= 1 && this.player.age <= 5) {
            ageGroup = 'toddler';
        } else if (this.player.age >= 6 && this.player.age <= 12) {
            ageGroup = 'childhood';
        } else if (this.player.age >= 13 && this.player.age <= 18) {
            ageGroup = 'teenager';
        } else if (this.player.age >= 19 && this.player.age <= 30) {
            ageGroup = 'adult';
        } else if (this.player.age >= 31 && this.player.age <= 50) {
            ageGroup = 'middleAge';
        } else if (this.player.age >= 51) {
            ageGroup = 'elderly';
        }

        let eventFound = false;
        
        if (typeof eventManager !== 'undefined') {
            const availableEvents = [];
            
            // 1. 优先检查标签事件
            console.log('Checking tag events...');
            this.player.tags.forEach(tag => {
                console.log(`Checking events for tag: ${tag}`);
                
                // 获取该标签的相关事件
                const tagEvents = eventManager.getTagEvents ? eventManager.getTagEvents(tag) : {};
                console.log(`Found ${Object.keys(tagEvents).length} events for tag ${tag}`);
                
                // 遍历标签事件
                Object.entries(tagEvents).forEach(([eventId, event]) => {
                    if (this.checkEventConditions(event, eventId)) {
                        console.log(`Event ${eventId} passed conditions check`);
                        availableEvents.push({ id: eventId, event, priority: 2 });
                    } else {
                        console.log(`Event ${eventId} failed conditions check`);
                    }
                });
                
                const tagDef = eventManager.tag_definitions && eventManager.tag_definitions[tag];
                if (tagDef) {
                    // 检查独占事件
                    if (tagDef.exclusive_events) {
                        tagDef.exclusive_events.forEach(eventId => {
                            const event = eventManager.getEvent ? eventManager.getEvent(eventId) : null;
                            if (event && this.checkEventConditions(event, eventId)) {
                                availableEvents.push({ id: eventId, event, priority: 3 });
                            }
                        });
                    }
                    // 检查优先事件
                    if (tagDef.priority_events) {
                        tagDef.priority_events.forEach(eventId => {
                            const event = eventManager.getEvent ? eventManager.getEvent(eventId) : null;
                            if (event && this.checkEventConditions(event, eventId)) {
                                availableEvents.push({ id: eventId, event, priority: 2 });
                            }
                        });
                    }
                }
            });
            
            // 2. 检查年龄段事件
            console.log(`Checking age group events for ${ageGroup}...`);
            if (ageGroup) {
                const ageGroupEvents = eventManager.ageEvents && eventManager.ageEvents[ageGroup] || {};
                Object.entries(ageGroupEvents).forEach(([eventId, event]) => {
                    if (this.checkEventConditions(event, eventId)) {
                        availableEvents.push({ id: eventId, event, priority: 1 });
                    }
                });
            }
            
            console.log(`Total available events: ${availableEvents.length}`);
            
            // 3. 选择事件
            if (availableEvents.length > 0) {
                // 按优先级排序
                availableEvents.sort((a, b) => b.priority - a.priority);
                // 如果有高优先级事件，只从高优先级中选择
                const maxPriority = availableEvents[0].priority;
                const highPriorityEvents = availableEvents.filter(e => e.priority === maxPriority);
                const selected = highPriorityEvents[Math.floor(Math.random() * highPriorityEvents.length)];
                
                console.log(`Selected event: ${selected.id}`);
                
                if (eventManager.markEventAsTriggered) {
                    eventManager.markEventAsTriggered(selected.id);
                }
                this.currentEvent = {
                    id: selected.id,
                    title: selected.event.title,
                    description: selected.event.description.replace(/{user}/g, this.player.name),
                    options: selected.event.options.map(option => ({
                        ...option,
                        text: option.text,
                        result: option.result ? option.result.replace(/{user}/g, this.player.name) : option.result
                    }))
                };
                eventFound = true;
            }
        }
        
        // 如果没有找到事件，显示无事发生
        if (!eventFound) {
            console.log('No event found, using default peaceful year event');
            this.currentEvent = {
                title: "平静的一年",
                description: `${this.player.name}度过了平静的一年，没有发生特别的事情。`,
                options: [
                    {
                        text: "继续",
                        result: "时光静静流逝...",
                        effects: {}
                    }
                ]
            };
        }
        
        this.showResult = false;
        this.eventResult = null;
        this.updateDisplay();
    }

    // 检查事件条件
    checkEventConditions(event, eventId) {
        // 使用 eventManager 的检查方法
        if (eventManager.checkEventConditions) {
            return eventManager.checkEventConditions(event, eventId, this.player);
        }
        
        // 备用检查逻辑
        // 检查是否已触发
        if (eventManager.isEventTriggered && eventManager.isEventTriggered(eventId)) {
            console.log(`Event ${eventId} already triggered`);
            return false;
        }
        if (!event.trigger_conditions) return true;
        const conditions = event.trigger_conditions;
        // 检查年龄范围
        if (conditions.age_range && 
            (this.player.age < conditions.age_range[0] || 
             this.player.age > conditions.age_range[1])) {
            return false;
        }
        // 检查必需标签
        if (conditions.required_tags && conditions.required_tags.length > 0) {
            const hasAllTags = conditions.required_tags.every(tag => 
                this.player.tags.includes(tag)
            );
            if (!hasAllTags) return false;
        }
        // 检查排除标签
        if (conditions.excluded_tags && conditions.excluded_tags.length > 0) {
            const hasExcludedTag = conditions.excluded_tags.some(tag => 
                this.player.tags.includes(tag)
            );
            if (hasExcludedTag) return false;
        }
        // 检查属性要求
        if (conditions.min_attributes) {
            for (const [attr, minValue] of Object.entries(conditions.min_attributes)) {
                if (this.player[attr] < minValue) return false;
            }
        }
        return true;
    }

    // 处理选择
    handleChoice(optionIndex) {
        try {
            if (!this.validateChoice(optionIndex)) {
                this.errorHandlers.showError(window.GAME_CONSTANTS.ERROR_MESSAGES.INVALID_CHOICE);
                return;
            }
            
            const option = this.currentEvent.options[optionIndex];
            if (!option) {
                throw new Error("Invalid option selected");
            }

            // 处理动态结果
            let finalResult = option;
            if (option.dynamic_result && typeof option.dynamic_result === 'function') {
                const dynamicResult = option.dynamic_result(this.player);
                finalResult = { ...option, ...dynamicResult };
            }

            // 应用效果
            if (finalResult.effects) {
                for (const [attr, value] of Object.entries(finalResult.effects)) {
                    if (attr in this.player) {
                        this.player[attr] = Math.max(0, this.player[attr] + value);
                        if (attr !== 'money' && attr !== 'age') {
                            this.player[attr] = Math.min(100, this.player[attr]);
                        }
                    }
                }
            }
            
            // 添加标签
            if (finalResult.add_tags) {
                finalResult.add_tags.forEach(tag => {
                    if (!this.player.tags.includes(tag)) {
                        this.player.tags.push(tag);
                        console.log(`Added tag: ${tag}`);
                        
                        // 检查成就解锁
                        if (typeof achievementManager !== 'undefined') {
                            const achievement = achievementManager.checkAndUnlockByTag(tag);
                            if (achievement) {
                                console.log(`Achievement unlocked: ${achievement.name}`);
                                if (achievement.golden) {
                                    this.showGoldenAchievement(achievement);
                                }
                            }
                        }
                    }
                });
            }
            
            // 移除标签
            if (finalResult.remove_tags) {
                this.player.tags = this.player.tags.filter(tag => !finalResult.remove_tags.includes(tag));
            }
            
            // 记录历史
            this.gameHistory.push(`${this.player.age}岁: ${this.currentEvent.title} - 选择"${option.text}"。结果: ${finalResult.result}`);

            // 检查健康值
            if (this.player.health <= 0) {
                this.player.alive = false;
                this.deathReason = `${this.playerName}在${this.player.age}岁时因健康耗尽而与世长辞。`;
                this.gameState = 'gameover';
                this.endGame();
                return;
            }
            
            // 设置事件结果
            this.eventResult = {
                text: finalResult.result,
                hasNextEventChain: !!finalResult.continue_event
            };
            
            // 检查是否有后续事件
            if (finalResult.continue_event) {
                this.nextEventId = finalResult.continue_event;
            } else if (this.currentEvent.continue_event) {
                this.nextEventId = this.currentEvent.continue_event;
            }
            
            this.showResult = true;
            this.updateDisplay();
            
        } catch (error) {
            this.errorHandlers.logError(error, "handleChoice");
            this.errorHandlers.showError("处理选择时出错");
        }
    }

    validateChoice(optionIndex) {
        return this.currentEvent && 
               this.currentEvent.options && 
               optionIndex >= 0 && 
               optionIndex < this.currentEvent.options.length;
            }

            // 下一个事件逻辑
            nextEventLogic() {
                this.showResult = false;
                
                // 年龄增长
                this.player.age++;
                
                // 检查是否需要添加小学生标签（4-5岁时）
                if (this.player.age === 4 || this.player.age === 5) {
                    if (!this.player.tags.includes('小学生')) {
                        console.log('Checking for school start event...');
                        // 检查是否有开始上学的事件
                        const schoolStartEvent = eventManager.getEvent ? eventManager.getEvent('start_school') : null;
                        if (schoolStartEvent && this.checkEventConditions(schoolStartEvent, 'start_school')) {
                            console.log('Triggering school start event');
                            this.currentEvent = {
                                id: 'start_school',
                                title: schoolStartEvent.title,
                                description: schoolStartEvent.description.replace(/{user}/g, this.player.name),
                                options: schoolStartEvent.options.map(option => ({
                                    ...option,
                                    text: option.text,
                                    result: option.result ? option.result.replace(/{user}/g, this.player.name) : option.result
                                }))
                            };
                            this.updateDisplay();
                            return;
                        }
                    }
                }
                
                // 检查成就解锁 - 年龄相关
                if (typeof achievementManager !== 'undefined') {
                    // 检查百岁成就
                    if (this.player.age >= 100) {
                        const achievement = achievementManager.checkAndUnlockByCondition('age_100', this.player.age);
                        if (achievement) {
                            console.log(`Achievement unlocked: ${achievement.name}`);
                        }
                    }
                    
                    // 检查第一次选择成就
                    if (this.gameHistory.length === 1) {
                        const achievement = achievementManager.checkAndUnlockByCondition('first_choice');
                        if (achievement) {
                            console.log(`Achievement unlocked: ${achievement.name}`);
                        }
                    }
                }
                
                // 老年健康衰退
                if (this.player.age > 50) {
                    const healthLoss = Math.floor(Math.random() * 3) + 1;
                    this.player.health = Math.max(0, this.player.health - healthLoss);
                    if (this.player.health <= 0) {
                        this.player.alive = false;
                        this.deathReason = `${this.playerName}在${this.player.age}岁时因年老体衰，自然离世。`;
                        this.gameState = 'gameover';
                        this.endGame();
                        return;
                    }
                }
                
                // 随机死亡几率
                let randomDeathChance = 0;
                if (this.player.age > 60) randomDeathChance += 0.02;
                if (this.player.age > 70) randomDeathChance += 0.03;
                if (this.player.age > 80) randomDeathChance += 0.05;
                if (this.player.age > 90) randomDeathChance += 0.1;
         
                if (randomDeathChance > 0 && Math.random() < randomDeathChance) {
                    this.player.alive = false;
                    this.deathReason = `${this.playerName}在${this.player.age}岁时平静地离开了人世。`;
                    this.gameState = 'gameover';
                    this.endGame();
                    return;
                }
                
                // 检查是否有待处理的后续事件
                if (this.nextEventId) {
                    console.log(`Processing next event: ${this.nextEventId}`);
                    const nextEvent = eventManager.getEvent ? eventManager.getEvent(this.nextEventId) : null;
                    if (nextEvent && this.checkEventConditions(nextEvent, this.nextEventId)) {
                        this.currentEvent = {
                            id: this.nextEventId,
                            title: nextEvent.title,
                            description: nextEvent.description.replace(/{user}/g, this.player.name),
                            options: nextEvent.options.map(option => ({
                                ...option,
                                text: option.text,
                                result: option.result ? option.result.replace(/{user}/g, this.player.name) : option.result
                            }))
                        };
                        this.nextEventId = null;
                        this.updateDisplay();
                        return;
                    }
                    this.nextEventId = null;
                }
                
                this.generateEvent();
            }
         
            // 更新显示
            updateDisplay() {
                if (this.gameState !== 'playing' || !this.player) return;
                
                document.getElementById('playerNameDisplay').textContent = this.playerName;
                document.getElementById('ageDisplay').textContent = `${this.player.age}岁`;
                document.getElementById('backgroundDisplay').textContent = this.player.background.name;
                
                const tagsContainer = document.getElementById('tagsContainer');
                this.renderTags(tagsContainer, this.getDisplayTags());
                
                const eventContainer = document.getElementById('eventContainer');
                eventContainer.innerHTML = '';
                
                if (this.showResult && this.eventResult) {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'result-display';
                    resultDiv.innerHTML = `
                        <div class="result-text">${this.eventResult.text}</div>
                        <button class="btn continue-btn" onclick="game.nextEventLogic()">
                            进入下一年
                        </button>
                    `;
                    eventContainer.appendChild(resultDiv);
                } else if (this.currentEvent) {
                    const eventCard = document.createElement('div');
                    eventCard.className = 'event-card';
                    let optionsHTML = '';
                    this.currentEvent.options.forEach((option, index) => {
                        optionsHTML += `
                            <button class="option-btn" onclick="game.handleChoice(${index})">
                                ${option.text}
                            </button>
                        `;
                    });
         
                    eventCard.innerHTML = `
                        <div class="event-title">${this.currentEvent.title}</div>
                        <div class="event-description">${this.currentEvent.description}</div>
                        <div class="options-container">${optionsHTML}</div>
                    `;
                    eventContainer.appendChild(eventCard);
                }
            }
         
            // 获取显示标签
            getDisplayTags() {
                if (!this.player) return [];
                
                let displayTags = [...this.player.tags];
                
                // 根据属性动态生成标签
                if (this.player.health >= 90) displayTags.push("健康");
                else if (this.player.health <= 30) displayTags.push("体弱多病");
         
                if (this.player.money >= 100) displayTags.push("富有");
                else if (this.player.money <= 20) displayTags.push("贫困");
         
                if (this.player.intelligence >= 90) displayTags.push("聪明");
                if (this.player.social >= 90) displayTags.push("社交达人");
                if (this.player.luck >= 90) displayTags.push("幸运");
                
                return [...new Set(displayTags)];
            }
         
            // 结束游戏
            endGame() {
                this.gameState = 'gameover';
                showScreen('gameoverScreen');
                
                document.getElementById('finalAge').textContent = `${this.player.age}岁`;
                document.getElementById('deathReason').textContent = this.deathReason;
                
                const finalTagsContainer = document.getElementById('finalTags');
                this.renderTags(finalTagsContainer, this.getDisplayTags());
                
                const historyList = document.getElementById('historyList');
                historyList.innerHTML = '';
                const historyToShow = this.gameHistory.slice(-10);
                historyToShow.forEach(item => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.textContent = item;
                    historyList.appendChild(historyItem);
                });
            }
         
            // 重新开始
            restart() {
                this.gameState = 'menu';
                this.player = null;
                this.currentEvent = null;
                this.currentEventId = null;
                this.eventResult = null;
                this.gameHistory = [];
                this.deathReason = '';
                this.showResult = false;
                this.selectedGender = null;
                this.playerName = '';
                this.nextEventId = null;
            }
         
            // 显示金色成就
            showGoldenAchievement(achievement) {
                const effectContainer = document.getElementById('goldenAchievementEffect');
                if (!effectContainer) return;
         
                const effectDiv = document.createElement('div');
                effectDiv.className = 'golden-achievement-effect';
                effectDiv.innerHTML = `
                    <div class="golden-achievement-content">
                        <div class="golden-achievement-title">🎉 获得成就！</div>
                        <div class="golden-achievement-desc">${achievement.name}</div>
                    </div>
                `;
                
                effectContainer.appendChild(effectDiv);
                
                setTimeout(() => {
                    effectDiv.remove();
                }, 1500);
            }
         }
         
         // === 全局实例和函数 ===
         
         // 使用window.game而不是const game确保全局可用
         window.game = new LifeSimulatorGame();
         
         // 显示屏幕
         function showScreen(screenId) {
            // 隐藏所有界面
            document.getElementById('mainMenu').style.display = 'none';
            document.getElementById('characterCreation').style.display = 'none';
            document.getElementById('achievementsScreen').style.display = 'none';
            document.getElementById('replayScreen').style.display = 'none';
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('gameoverScreen').style.display = 'none';
            
            // 显示目标界面
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.style.display = 'block';
            } else {
                console.error(`Screen with ID "${screenId}" not found`);
            }
         }
         
         // 将函数暴露到全局作用域
         window.showCharacterCreation = function() {
            // 重置状态
            game.selectedGender = null;
            game.playerName = '';
            
            // 清空输入框
            const nameInput = document.getElementById('playerName');
            if (nameInput) {
                nameInput.value = '';
            }
            
            // 清除性别选择
            document.querySelectorAll('.gender-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // 禁用开始按钮
            const startBtn = document.getElementById('startLifeBtn');
            if (startBtn) {
                startBtn.disabled = true;
            }
            
            // 显示界面
            showScreen('characterCreation');
         };
         
         // 显示成就
         function showAchievements() {
            if (typeof achievementManager !== 'undefined') {
                achievementManager.renderAchievements();
            }
            showScreen('achievementsScreen');
         }
         
         // 显示回放屏幕
         function showReplayScreen() {
            renderSavedLives();
            showScreen('replayScreen');
         }
         
         // 返回主菜单
         function backToMainMenu() {
            showScreen('mainMenu');
         }
         
         // 更新开始按钮
         function updateStartButton() {
            const nameInput = document.getElementById('playerName');
            const startBtn = document.getElementById('startLifeBtn');
            
            if (!nameInput || !startBtn) {
                console.error('Required elements not found');
                return;
            }
            
            game.playerName = nameInput.value.trim();
            
            // 只有当性别和名字都有值时才启用按钮
            startBtn.disabled = !(game.selectedGender && game.playerName);
         }
         
         // 开始新人生
         function startNewLife() {
            if (!game.selectedGender || !game.playerName) return;
            game.startGame();
            showScreen('gameScreen');
         }
         
         // 重新开始游戏
         function restartGame() {
            game.restart();
            showScreen('mainMenu');
         }
         
         // 保存人生
         function saveLife() {
            const lifeRecord = game.saveLifeRecord();
            if (lifeRecord) {
                alert(`${game.player.name} (${game.player.age}岁) 的人生已保存！`);
            }
            restartGame();
         }
         
         // 确认重置游戏
         function confirmResetGame() {
            if (confirm("您确定要重置所有游戏数据吗？\n这将清除所有已解锁的成就和保存的人生记录。\n此操作不可撤销！")) {
                resetGameData();
            }
         }
         
         // 重置游戏数据
         function resetGameData() {
            localStorage.removeItem('unlockedAchievements');
            if (typeof achievementManager !== 'undefined') {
                achievementManager.init();
            }
         
            localStorage.removeItem('savedLives');
            game.savedLives = [];
         
            alert("游戏数据已重置。\n所有成就和保存的人生记录已被清除。");
         
            if (document.getElementById('achievementsScreen').style.display === 'block') {
                showAchievements();
            }
            if (document.getElementById('replayScreen').style.display === 'block') {
                showReplayScreen();
            }
         }
         
         // 渲染保存的人生
         function renderSavedLives() {
            const container = document.getElementById('savedLivesList');
            container.innerHTML = '';
            
            if (game.savedLives.length === 0) {
                container.innerHTML = '<p style="text-align: center; color: #999; margin-top: 20px;">还没有保存的人生记录</p>';
                return;
            }
            
            game.savedLives.forEach(life => {
                const lifeDiv = document.createElement('div');
                lifeDiv.className = 'saved-life-item';
                lifeDiv.onclick = () => showLifeDetailsModal(life);
                
                const displayTags = life.tags || [];
                const tagsHTML = displayTags.slice(0, 5).map(tag => {
                    return `<div class="tag">#${tag}</div>`;
                }).join('');
                
                lifeDiv.innerHTML = `
                    <div class="saved-life-info">
                        <div class="saved-life-name">${life.gender === 'male' ? '👦' : '👧'} ${life.name}</div>
                        <div class="saved-life-age">${life.age}岁 · ${life.date}</div>
                    </div>
                    <div class="saved-life-tags">
                        ${tagsHTML}
                        ${displayTags.length > 5 ? `<div class="tag">+${displayTags.length - 5}</div>` : ''}
                    </div>
                `;
                container.appendChild(lifeDiv);
            });
         }
         
         // 显示人生详情模态框
         function showLifeDetailsModal(lifeRecord) {
            document.getElementById('replayModalTitle').textContent = `人生回顾 - ${lifeRecord.name}`;
            document.getElementById('replayModalName').textContent = lifeRecord.name;
            document.getElementById('replayModalGender').textContent = lifeRecord.gender === 'male' ? '男性' : '女性';
            document.getElementById('replayModalAge').textContent = `${lifeRecord.age}岁`;
            document.getElementById('replayModalBackground').textContent = lifeRecord.background;
            document.getElementById('replayModalDeathReason').textContent = lifeRecord.deathReason || '未记录';
         
            const tagsContainer = document.getElementById('replayModalTags');
            tagsContainer.innerHTML = '';
            const displayTags = lifeRecord.tags || [];
            if (displayTags.length > 0) {
                displayTags.forEach(tag => {
                    const tagElement = document.createElement('div');
                    tagElement.className = 'tag';
                    tagElement.textContent = `#${tag}`;
                    tagsContainer.appendChild(tagElement);
                });
            } else {
                tagsContainer.textContent = '无特殊标签';
            }
         
            const historyList = document.getElementById('replayModalHistoryList');
            historyList.innerHTML = '';
            const history = lifeRecord.history || [];
            if (history.length > 0) {
                history.forEach(item => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.textContent = item;
                    historyList.appendChild(historyItem);
                });
            } else {
                historyList.innerHTML = '<p style="text-align:center; color:#888;">无事件记录。</p>';
            }
            
            document.getElementById('replayDetailsModal').style.display = 'flex';
         }
         
         // 隐藏人生详情模态框
         function hideLifeDetailsModal() {
            document.getElementById('replayDetailsModal').style.display = 'none';
         }
         
         // === 初始化和事件监听 ===
         
         window.addEventListener('DOMContentLoaded', () => {
            // 初始化时隐藏所有界面
            document.getElementById('characterCreation').style.display = 'none';
            document.getElementById('achievementsScreen').style.display = 'none';
            document.getElementById('replayScreen').style.display = 'none';
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('gameoverScreen').style.display = 'none';
            
            // 只显示主菜单
            document.getElementById('mainMenu').style.display = 'block';
            
            // 绑定名字输入事件
            const playerNameInput = document.getElementById('playerName');
            if (playerNameInput) {
                playerNameInput.addEventListener('input', updateStartButton);
            }
            
            // 初始化成就系统
            if (typeof achievementManager !== 'undefined') {
                achievementManager.init();
            }
            
            // 不要在这里调用 updateStartButton()，因为此时还没有选择性别和输入名字
         });
         
         // 点击模态框外部关闭
         window.addEventListener('click', (event) => {
            const modal = document.getElementById('replayDetailsModal');
            if (event.target === modal) {
                hideLifeDetailsModal();
            }
         });