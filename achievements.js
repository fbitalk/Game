// achievements.js - 成就系统

const achievementManager = {
    // 成就定义
    achievements: [
        // 1星成就（容易）
        {
            id: 'first_choice',
            name: '人生第一步',
            description: '做出第一个人生选择',
            icon: '👶',
            stars: 1,
            condition: 'first_choice',
            unlocked: false
        },
        {
            id: 'bird_person',
            name: '鸟人',
            description: '救助过小鸟',
            icon: '🐦',
            stars: 1,
            tag: '鸟人',
            unlocked: false
        },
        {
            id: 'student',
            name: '学生时代',
            description: '成为学霸',
            icon: '📚',
            stars: 1,
            tag: '学霸',
            unlocked: false
        },
        
        // 2星成就（中等）
        {
            id: 'charitable',
            name: '慈善家',
            description: '热心公益事业',
            icon: '❤️',
            stars: 2,
            tag: '慈善家',
            unlocked: false
        },
        {
            id: 'sports_star',
            name: '运动健将',
            description: '在体育方面表现出色',
            icon: '🏃',
            stars: 2,
            tag: '运动健将',
            unlocked: false
        },
        {
            id: 'academic_star',
            name: '学术新星',
            description: '在学术上取得卓越成就',
            icon: '🌟',
            stars: 2,
            tag: '学术新星',
            unlocked: false
        },
        
        // 3星成就（困难）
        {
            id: 'rich_person',
            name: '富甲一方',
            description: '成为富豪',
            icon: '💰',
            stars: 3,
            tag: '富豪',
            unlocked: false
        },
        {
            id: 'super_rich',
            name: '巨富',
            description: '积累巨额财富',
            icon: '💎',
            stars: 3,
            tag: '巨富',
            unlocked: false
        },
        {
            id: 'centenarian',
            name: '百岁人瑞',
            description: '活到100岁',
            icon: '👴',
            stars: 3,
            condition: 'age_100',
            unlocked: false
        },
        
        // 金色成就（特殊）
        {
            id: 'parent',
            name: '为人父母',
            description: '结婚生子，成为父母',
            icon: '👨‍👩‍👧‍👦',
            stars: 2,
            tag: '为人父母',
            golden: true,
            unlocked: false
        },
        {
            id: 'entrepreneur',
            name: '创业成功',
            description: '成功创立自己的事业',
            icon: '🏢',
            stars: 3,
            tag: '企业家',
            golden: true,
            unlocked: false
        },
        {
            id: 'hero',
            name: '英雄',
            description: '在关键时刻挺身而出',
            icon: '🦸',
            stars: 3,
            tag: '英雄',
            golden: true,
            unlocked: false
        },
        {
            id: 'scientist',
            name: '科学家',
            description: '在科学领域做出贡献',
            icon: '🔬',
            stars: 3,
            tag: '科学家',
            golden: true,
            unlocked: false
        },
        {
            id: 'artist',
            name: '艺术家',
            description: '在艺术领域获得认可',
            icon: '🎨',
            stars: 3,
            tag: '艺术家', // Assuming '艺术家' is a tag that can be gained
            golden: true,
            unlocked: false
        }
    ],

    // 初始化成就系统
    init() {
        // Ensure all achievements are initially marked as locked in memory
        this.achievements.forEach(a => { a.unlocked = false; });
        this.loadUnlockedAchievements(); // Then load from storage
    },

    // 加载已解锁的成就
    loadUnlockedAchievements() {
        const saved = localStorage.getItem('unlockedAchievements');
        // Reset all to locked before loading, so if storage is empty/cleared, it reflects correctly
        this.achievements.forEach(achievement => achievement.unlocked = false);
        if (saved) {
            const unlockedIds = JSON.parse(saved);
            unlockedIds.forEach(id => {
                const achievement = this.achievements.find(a => a.id === id);
                if (achievement) {
                    achievement.unlocked = true;
                }
            });
        }
    },

    // 保存解锁的成就
    saveUnlockedAchievements() {
        const unlockedIds = this.achievements
            .filter(a => a.unlocked)
            .map(a => a.id);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedIds));
    },

    // 根据标签检查并解锁成就
    checkAndUnlockByTag(tag) {
        const achievement = this.achievements.find(a => a.tag === tag && !a.unlocked);
        if (achievement) {
            achievement.unlocked = true;
            this.saveUnlockedAchievements();
            return achievement;
        }
        return null;
    },

    // 根据条件检查并解锁成就
    checkAndUnlockByCondition(condition, value) {
        const achievement = this.achievements.find(a => a.condition === condition && !a.unlocked);
        if (achievement) {
            if (condition === 'age_100' && value >= 100) {
                achievement.unlocked = true;
                this.saveUnlockedAchievements();
                return achievement;
            } else if (condition === 'first_choice') { // No specific value needed for first_choice
                achievement.unlocked = true;
                this.saveUnlockedAchievements();
                return achievement;
            }
        }
        return null;
    },

    // 获取成就通过标签
    getAchievementByTag(tag) {
        return this.achievements.find(a => a.tag === tag);
    },

    // 获取所有已解锁的成就
    getUnlockedAchievements() {
        return this.achievements.filter(a => a.unlocked);
    },

    // 渲染成就页面
    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        container.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            const starsHTML = '⭐'.repeat(achievement.stars);
            
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-stars">${starsHTML}</div>
            `;
            
            card.title = achievement.description;
            container.appendChild(card);
        });
    }
};

// 初始化成就系统
achievementManager.init();