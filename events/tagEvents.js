// events/tagEvents.js - 标签事件文件

const TAG_EVENTS = {
    // 见义勇为相关
    "teen_hero_reward": {
        title: "少年英雄表彰",
        description: "学校为{user}的英勇行为举行了表彰大会。",
        trigger_conditions: {
            required_tags: ["少年英雄"],
            age_range: [16, 18]
        },
        options: [
            {
                text: "谦虚接受",
                result: "{user}谦虚地接受了表彰，赢得了更多人的尊重。",
                effects: { social: 20, intelligence: 10 },
                add_tags: ["谦逊"]
            },
            {
                text: "享受荣誉",
                result: "{user}充分享受着英雄的光环。",
                effects: { social: 15, luck: 5 }
            }
        ]
    },
    
    "hero_ceremony": {
        title: "英雄授勋",
        description: "市政府决定为{user}的英勇行为授予勋章。",
        trigger_conditions: {
            required_tags: ["英雄"]
        },
        options: [
            {
                text: "接受勋章",
                conditional_results: [
                    {
                        conditions: {
                            tags: ["谦逊", "慈善家"]
                        },
                        result: "{user}在授勋仪式上宣布将奖金全部捐给慈善机构！",
                        effects: { social: 50, money: -20 },
                        add_tags: ["人民英雄"]
                    },
                    {
                        conditions: { default: true },
                        result: "{user}接受了勋章和奖金，成为了城市英雄。",
                        effects: { money: 30, social: 30 },
                        add_tags: ["城市英雄"]
                    }
                ]
            }
        ]
    },
    
    "business_empire": {
        title: "商业帝国",
        description: "巨大的成功让{user}有机会建立自己的商业帝国。",
        trigger_conditions: {
            required_tags: ["投资大亨"],
            min_attributes: { money: 200 }
        },
        options: [
            {
                text: "建立跨国公司",
                result: "{user}成立了自己的跨国公司，成为商界传奇！",
                effects: { money: 100, social: 40 },
                add_tags: ["商业传奇", "亿万富翁"]
            },
            {
                text: "专注投资",
                result: "{user}继续专注于投资，成为了投资界的传奇人物。",
                effects: { money: 80, intelligence: 20 },
                add_tags: ["投资传奇"]
            }
        ]
    },
    
    // 网吧养大相关
    "internet_addiction_risk": {
        title: "网瘾危机",
        description: "{user}在网吧环境中长大，面临着网瘾的风险...",
        trigger_conditions: {
            required_tags: ["网吧养大"],
            age_range: [8, 16],
            excluded_tags: ["网瘾少年"]
        },
        options: [
            {
                text: "沉迷网络",
                result: "{user}沉迷于网络游戏，学习成绩下降。",
                effects: { intelligence: -10, social: -5, health: -5 },
                add_tags: ["网瘾少年"],
                remove_tags: ["学霸"]
            },
            {
                text: "适度娱乐",
                result: "{user}学会了合理利用网络资源。",
                effects: { intelligence: 10, social: 5 },
                add_tags: ["网络达人"]
            }
        ]
    },
    
    "street_smart_event": {
        title: "街头智慧",
        description: "在网吧复杂的环境中，{user}遇到了一些麻烦...",
        trigger_conditions: {
            required_tags: ["街头智慧"],
            age_range: [10, 20]
        },
        options: [
            {
                text: "机智化解",
                result: "{user}凭借街头智慧化解了危机。",
                effects: { social: 15, luck: 10 },
                add_tags: ["机智过人"]
            },
            {
                text: "寻求帮助",
                result: "{user}找到了可靠的朋友帮忙。",
                effects: { social: 20 },
                add_tags: ["人缘好"]
            }
        ]
    },
    
    // 英雄相关
    "hero_path_begin": {
        title: "英雄之路",
        description: "拥有力量的{user}遇到了需要帮助的人...",
        trigger_conditions: {
            required_tags: ["英雄"],
            age_range: [18, 40]
        },
        options: [
            {
                text: "见义勇为",
                result: "{user}挺身而出，帮助了他人。",
                effects: { social: 25, health: -10 },
                add_tags: ["见义勇为"]
            },
            {
                text: "谨慎行事",
                result: "{user}选择了更稳妥的方式帮助他人。",
                effects: { intelligence: 10, social: 10 }
            }
        ]
    },
    
    // 富二代相关
    "luxury_school": {
        title: "贵族学校",
        description: "父母为{user}选择了最好的贵族学校...",
        trigger_conditions: {
            required_tags: ["富二代"],
            age_range: [6, 12],
            min_attributes: { money: 80 }
        },
        options: [
            {
                text: "认真学习",
                result: "{user}在优越的教育环境中茁壮成长。",
                effects: { intelligence: 20, social: 15 },
                add_tags: ["精英教育"]
            },
            {
                text: "纨绔子弟",
                result: "{user}养成了一些不好的习惯。",
                effects: { social: 10, money: -10 },
                add_tags: ["纨绔子弟"]
            }
        ]
    },
    
    "investment_opportunity": {
        title: "投资机会",
        description: "家族企业有一个投资项目，需要{user}参与决策...",
        trigger_conditions: {
            required_tags: ["富二代"],
            age_range: [20, 40],
            min_attributes: { money: 100, intelligence: 70 }
        },
        options: [
            {
                text: "大胆投资",
                result: "{user}的投资眼光得到了验证！",
                effects: { money: 50, intelligence: 10 },
                add_tags: ["投资高手"],
                risk: 0.2
            },
            {
                text: "保守观望",
                result: "{user}选择了更稳健的方式。",
                effects: { money: 10, intelligence: 5 }
            }
        ]
    },
    
    // 学霸相关
    "academic_excellence": {
        title: "学术卓越",
        description: "{user}在学术上取得了优异成绩，获得了进一步深造的机会。",
        trigger_conditions: {
            required_tags: ["学霸"],
            age_range: [16, 25],
            min_attributes: { intelligence: 85 }
        },
        options: [
            {
                text: "申请名校",
                result: "{user}成功进入了世界顶尖学府深造。",
                effects: { intelligence: 20, social: 15 },
                add_tags: ["名校学生"]
            },
            {
                text: "获得奖学金",
                result: "{user}获得了全额奖学金。",
                effects: { money: 30, intelligence: 10 },
                add_tags: ["奖学金获得者"]
            }
        ]
    },
    
    // 慈善家相关
    "charity_event": {
        title: "慈善活动",
        description: "有一个大型慈善活动需要{user}的参与...",
        trigger_conditions: {
            required_tags: ["慈善家"],
            age_range: [25, 70]
        },
        options: [
            {
                text: "组织募捐",
                result: "{user}成功组织了一场大型募捐活动。",
                effects: { social: 30, money: -20 },
                add_tags: ["慈善领袖"]
            },
            {
                text: "亲身参与",
                result: "{user}亲自到贫困地区帮助需要的人。",
                effects: { social: 25, health: -10 },
                add_tags: ["慈善实践者"]
            }
        ]
    },
    
    // 企业家相关
    "business_expansion": {
        title: "业务扩张",
        description: "{user}的企业面临扩张的机会...",
        trigger_conditions: {
            required_tags: ["企业家"],
            min_attributes: { money: 150 }
        },
        options: [
            {
                text: "进军国际市场",
                result: "{user}成功将业务拓展到国际市场。",
                effects: { money: 80, social: 30 },
                add_tags: ["跨国企业家"]
            },
            {
                text: "深耕国内市场",
                result: "{user}选择专注于国内市场的发展。",
                effects: { money: 50, social: 20 },
                add_tags: ["行业领袖"]
            }
        ]
    },
    
    // 为人父母相关
    "parenting_event": {
        title: "教育选择",
        description: "孩子到了上学的年龄，{user}需要做出选择...",
        trigger_conditions: {
            required_tags: ["为人父母"],
            age_range: [30, 50]
        },
        options: [
            {
                text: "精英教育",
                result: "{user}为孩子选择了最好的教育资源。",
                effects: { money: -40, intelligence: 10 },
                add_tags: ["重视教育"]
            },
            {
                text: "快乐童年",
                result: "{user}选择让孩子有一个快乐的童年。",
                effects: { social: 20, health: 10 },
                add_tags: ["开明父母"]
            }
        ]
    },
    
    // 特殊能力相关
    "special_ability_event": {
        title: "能力觉醒",
        description: "{user}的特殊能力在关键时刻觉醒了...",
        trigger_conditions: {
            required_tags: ["葫芦娃"],
            age_range: [10, 30]
        },
        options: [
            {
                text: "使用能力救人",
                result: "{user}使用特殊能力救了很多人。",
                effects: { social: 40, health: -20 },
                add_tags: ["超级英雄"]
            },
            {
                text: "隐藏能力",
                result: "{user}选择继续隐藏自己的能力。",
                effects: { intelligence: 15, luck: 10 },
                add_tags: ["隐世高手"]
            }
        ]
    },
    
    // 科学家相关
    "scientific_breakthrough": {
        title: "科学突破",
        description: "{user}在研究中发现了重要的科学突破...",
        trigger_conditions: {
            required_tags: ["科学家"],
            min_attributes: { intelligence: 90 }
        },
        options: [
            {
                text: "发表论文",
                result: "{user}的研究成果震惊了学术界。",
                effects: { intelligence: 20, social: 30 },
                add_tags: ["学术权威"]
            },
            {
                text: "申请专利",
                result: "{user}的发明获得了专利保护。",
                effects: { money: 50, intelligence: 15 },
                add_tags: ["发明家"]
            }
        ]
    },
    
    // 红色标签独占事件
    "curse_event": {
        title: "诅咒发作",
        description: "神秘的诅咒开始影响{user}的生活...",
        trigger_conditions: {
            required_tags: ["诅咒之子"]
        },
        options: [
            {
                text: "寻找解咒方法",
                result: "{user}踏上了寻找解咒方法的旅程。",
                effects: { health: -20, intelligence: 10 },
                risk: 0.3
            },
            {
                text: "接受命运",
                result: "{user}选择接受诅咒，与之共存。",
                effects: { health: -30, luck: -10 }
            }
        ]
    },
    
    "terminal_illness_event": {
        title: "病情恶化",
        description: "{user}的病情突然恶化了...",
        trigger_conditions: {
            required_tags: ["绝症"]
        },
        options: [
            {
                text: "实验性治疗",
                result: "{user}尝试了实验性的治疗方法。",
                effects: { health: -40, money: -50 },
                risk: 0.5
            },
            {
                text: "珍惜时光",
                result: "{user}选择珍惜剩下的时光。",
                effects: { social: 20, health: -50 }
            }
        ]
    },
    
    "fugitive_event": {
        title: "逃亡生活",
        description: "作为通缉犯，{user}必须时刻保持警惕...",
        trigger_conditions: {
            required_tags: ["通缉犯"]
        },
        options: [
            {
                text: "继续逃亡",
                result: "{user}成功躲过了这次追捕。",
                effects: { luck: -20, intelligence: 10 },
                risk: 0.4
            },
            {
                text: "自首",
                result: "{user}决定自首，结束逃亡生活。",
                effects: { social: -30, health: -20 },
                remove_tags: ["通缉犯"]
            }
        ]
    },
    
    "demon_contract_event": {
        title: "恶魔的要求",
        description: "恶魔来收取契约的代价了...",
        trigger_conditions: {
            required_tags: ["恶魔契约"]
        },
        options: [
            {
                text: "履行契约",
                result: "{user}付出了契约要求的代价。",
                effects: { health: -50, luck: -30 }
            },
            {
                text: "违背契约",
                result: "{user}试图违背契约，后果难料...",
                effects: { health: -80, social: -40 },
                risk: 0.8
            }
        ]
    },
    
    // 小学生标签相关事件
    "elementary_homework_nightmare": {
        title: "作业地狱",
        description: "数学作业：一课一练P5-P90页。语文作业：抄写李白古诗3000首。英语作业：写一篇5万字的英文议论文......这些就是{user}每天都要应付的作业量。{user}____",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "熬夜做作业",
                result: "{user}熬夜做作业，最终累倒了...",
                effects: { health: -100 },
                risk: 1.0
            },
            {
                text: "第二天抄同学的",
                result: "{user}选择了抄作业这条捷径。",
                effects: { intelligence: -5, social: 5 },
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        -1, 
                        "{user}的学习成绩下降了。"
                    ) || {
                        result: "{user}的学习成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "尽量做",
                result: "{user}努力完成作业，虽然很辛苦但学到了知识。",
                effects: { intelligence: 10, health: -5 },
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的学习成绩提升了。"
                    ) || {
                        result: "{user}的学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "作业见鬼去吧",
                result: "{user}把作业扔到一边，痛快地玩去了。",
                effects: { health: 10, social: 5 },
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        -1, 
                        "{user}的学习成绩下降了。"
                    ) || {
                        result: "{user}的学习成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_science_fair": {
        title: "科学展览会",
        description: "学校举办了一年一度的科学展览会。",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "制作火山模型",
                result: "{user}制作了一个会喷发的火山模型，获得了大家的赞赏。",
                effects: { intelligence: 8, social: 5 },
                add_tags: ["科学爱好者"]
            },
            {
                text: "展示植物生长实验",
                result: "{user}展示了植物在不同条件下的生长情况，展现了观察力。",
                effects: { intelligence: 5 },
                add_tags: ["观察力强"]
            },
            {
                text: "制作简单电路",
                result: "{user}制作了一个简单的电路装置，展现了动手能力。",
                effects: { intelligence: 6 },
                add_tags: ["动手能力强"]
            }
        ]
    },
    
    "elementary_sports_day": {
        title: "运动会",
        description: "学校举办了一年一度的运动会。",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "参加短跑",
                result: "{user}在短跑比赛中取得了好成绩。",
                effects: { health: 8, social: 5 },
                add_tags: ["运动健将"]
            },
            {
                text: "参加接力赛",
                result: "{user}和同学们一起参加接力赛，培养了团队精神。",
                effects: { health: 5, social: 8 },
                add_tags: ["团队精神"]
            },
            {
                text: "当啦啦队",
                result: "{user}选择当啦啦队，为同学们加油助威。",
                effects: { social: 10 },
                add_tags: ["热情助人"]
            }
        ]
    },
    
    "elementary_art_class": {
        title: "美术课",
        description: "美术课上，老师让同学们自由画画。",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "画一幅风景画",
                result: "{user}画了一幅漂亮的风景画，展现了艺术天赋。",
                effects: { intelligence: 5 },
                add_tags: ["艺术细胞"]
            },
            {
                text: "画一幅人物画",
                result: "{user}画了一幅生动的人物画，展现了观察力。",
                effects: { intelligence: 5 },
                add_tags: ["观察力强"]
            },
            {
                text: "画一幅抽象画",
                result: "{user}画了一幅充满想象力的抽象画，展现了创造力。",
                effects: { intelligence: 6 },
                add_tags: ["创造力"]
            }
        ]
    },
    
    "elementary_music_recital": {
        title: "音乐演奏会",
        description: "学校举办了一场音乐演奏会。",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "演奏钢琴",
                result: "{user}演奏了一首优美的钢琴曲，展现了音乐天赋。",
                effects: { intelligence: 5, social: 5 },
                add_tags: ["音乐天赋"]
            },
            {
                text: "合唱表演",
                result: "{user}参加了合唱表演，培养了团队合作精神。",
                effects: { social: 8 },
                add_tags: ["团队精神"]
            },
            {
                text: "当观众",
                result: "{user}作为观众欣赏了表演，培养了艺术鉴赏能力。",
                effects: { intelligence: 3 },
                add_tags: ["艺术鉴赏"]
            }
        ]
    },
    
    "elementary_english_class": {
        title: "外教询问",
        description: "外教课上，老师向{user}打招呼：'How are you?'，{user}回答：",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "Hi, Bro!",
                result: "{user}的回答很新潮，外教笑了。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答很新潮，外教笑了，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答很新潮，外教笑了，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "Error 404 not found",
                result: "{user}的回答让外教摸不着头脑，但展现了幽默感。",
                effects: {},
                add_tags: ["程序员"]
            },
            {
                text: "Good good study, day day up",
                result: "{user}的回答非常中式，外教努力理解中。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        -3, 
                        "{user}的回答非常中式，外教努力理解中，学习成绩下降了。"
                    ) || {
                        result: "{user}的回答非常中式，外教努力理解中，学习成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "42",
                result: "{user}的回答充满了哲学意味，外教陷入了沉思。",
                effects: {},
                add_tags: ["科幻"]
            },
            {
                text: "You are very handsome",
                result: "{user}的回答让外教心花怒放。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答让外教心花怒放，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答让外教心花怒放，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "I am fine, thank you. And you?",
                result: "{user}的回答标准而有礼貌。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答标准而有礼貌，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答标准而有礼貌，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_english_fill_blank": {
        title: "英语课：填空",
        description: "英语老师出题：Please fill in the blank: 'I _____ an apple yesterday.' {user}填写的答案是：",
        trigger_conditions: { 
            age_range: [6, 12], 
            required_tags: ["小学生"] 
        },
        options: [
            { 
                text: "eat", 
                result: "{user}的答案不完全正确，但勇气可嘉。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案不完全正确，但勇气可嘉，学习成绩提升了。"
                    ) || {
                        result: "{user}的答案不完全正确，但勇气可嘉，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "ate", 
                result: "{user}的答案完全正确！", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案完全正确！学习成绩提升了。"
                    ) || {
                        result: "{user}的答案完全正确！学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "eating", 
                result: "{user}的答案时态有些问题。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案时态有些问题，学习成绩提升了。"
                    ) || {
                        result: "{user}的答案时态有些问题，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "am", 
                result: "{user}的答案语法不太对哦。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案语法不太对哦，学习成绩提升了。"
                    ) || {
                        result: "{user}的答案语法不太对哦，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "吃了", 
                result: "{user}用中文回答了英文题。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}用中文回答了英文题，学习成绩提升了。"
                    ) || {
                        result: "{user}用中文回答了英文题，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "apple", 
                result: "{user}似乎没理解题目。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}似乎没理解题目，学习成绩提升了。"
                    ) || {
                        result: "{user}似乎没理解题目，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "yesterday", 
                result: "{user}把题目里的词又填了一遍。", 
                dynamic_result: function (player) { 
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}把题目里的词又填了一遍，学习成绩提升了。"
                    ) || {
                        result: "{user}把题目里的词又填了一遍，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            { 
                text: "我不吃苹果", 
                result: "{user}的回答出人意料，展现了高情商。", 
                effects: {}, 
                add_tags: ["高情商"] 
            }
        ]
    },
    
    "elementary_pe_running": {
        title: "体育课：跑步",
        description: "体育老师让全班同学跑800米，{user}的选择是：",
        trigger_conditions: { 
            age_range: [6, 13], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "认真跑完全程",
                result: "{user}坚持跑完了全程，虽然很累但是很有成就感。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "体育成绩:", 
                        2, 
                        "{user}坚持跑完了全程，体育成绩提升了。"
                    ) || {
                        result: "{user}坚持跑完了全程，体育成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "偷偷走一半",
                result: "{user}偷偷走了一半的路程，没被老师发现。",
                effects: {},
                add_tags: ["小滑头"]
            },
            {
                text: "装病逃跑",
                result: "{user}装病逃过了跑步，却被老师发现了。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "体育成绩:", 
                        -1, 
                        "{user}装病被老师发现，体育成绩下降了。"
                    ) || {
                        result: "{user}装病被老师发现，体育成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "和同学比赛",
                result: "{user}和好朋友一起比赛，跑得更起劲了。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "体育成绩:", 
                        3, 
                        "{user}和好朋友一起比赛，体育成绩大幅提升。"
                    ) || {
                        result: "{user}和好朋友一起比赛，体育成绩大幅提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_music_singing": {
        title: "音乐课：唱歌",
        description: "音乐老师让同学们轮流唱歌，轮到{user}了：",
        trigger_conditions: { 
            age_range: [6, 13], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "唱《小星星》",
                result: "{user}唱了一首《小星星》，声音清脆悦耳。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "音乐成绩:", 
                        2, 
                        "{user}唱了一首《小星星》，音乐成绩提升了。"
                    ) || {
                        result: "{user}唱了一首《小星星》，音乐成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "唱《两只老虎》",
                result: "{user}唱了一首《两只老虎》，全班同学都跟着一起唱。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "音乐成绩:", 
                        3, 
                        "{user}唱了一首《两只老虎》，带动了全班气氛，音乐成绩大幅提升。"
                    ) || {
                        result: "{user}唱了一首《两只老虎》，带动了全班气氛，音乐成绩大幅提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "假装嗓子疼",
                result: "{user}找了个借口逃避唱歌。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "音乐成绩:", 
                        -1, 
                        "{user}找了个借口逃避唱歌，音乐成绩下降了。"
                    ) || {
                        result: "{user}找了个借口逃避唱歌，音乐成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "唱一首自创歌曲",
                result: "{user}唱了一首自己编的歌，虽然跑调但很有创意。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "音乐成绩:", 
                        1, 
                        "{user}唱了一首自己编的歌，音乐成绩略有提升。"
                    ) || {
                        result: "{user}唱了一首自己编的歌，音乐成绩略有提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "唱《孤勇者》",
                result: "{user}唱了一首《孤勇者》，展现了不错的歌唱实力。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "音乐成绩:", 
                        1, 
                        "{user}唱了一首《孤勇者》，音乐成绩有所提升。"
                    ) || {
                        result: "{user}唱了一首《孤勇者》，音乐成绩有所提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_math_problem": {
        title: "数学课：煮苹果",
        description: "数学老师提问：煮一个苹果需要3分钟，煮三个苹果需要多少分钟？{user}回答：",
        trigger_conditions: {
            required_tags: ["小学生"],
            age_range: [6, 12]
        },
        options: [
            {
                text: "1+1=3",
                result: "{user}的答案石破天惊，老师决定给个机会。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案石破天惊，老师决定给个机会，学习成绩提升了。"
                    ) || {
                        result: "{user}的答案石破天惊，老师决定给个机会，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "条件不足，此题无解",
                result: "{user}的回答非常严谨，但可能有点钻牛角尖。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答非常严谨，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答非常严谨，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "9分钟",
                result: "{user}的回答中规中矩。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答中规中矩，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答中规中矩，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "3分钟",
                result: "{user}的回答显示了灵活的思维。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答显示了灵活的思维，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答显示了灵活的思维，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_math_apple_count": {
        title: "数学课：数苹果",
        description: "数学老师又问：小明有10个苹果，吃了3个，还剩几个？{user}回答：",
        trigger_conditions: { 
            age_range: [6, 12], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "7个",
                result: "{user}给出了标准答案。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}给出了标准答案，学习成绩提升了。"
                    ) || {
                        result: "{user}给出了标准答案，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "不知道，我不喜欢苹果",
                result: "{user}的回答让老师哭笑不得。",
                effects: {},
                add_tags: ["幽默"]
            },
            {
                text: "10个，他只是咬了几口",
                result: "{user}的回答很有创意，让老师和同学们都笑了。",
                effects: {},
                add_tags: ["创意思维"]
            }
        ]
    },
    
    "elementary_foreign_teacher_greeting": {
        title: "外教询问",
        description: "外教课上，老师向{user}打招呼：'How are you?'，{user}回答：",
        trigger_conditions: { 
            age_range: [6, 12], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "Hi, Bro!",
                result: "{user}的回答很新潮，外教笑了。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答很新潮，外教笑了，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答很新潮，外教笑了，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "Error 404 not found",
                result: "{user}的回答让外教摸不着头脑，但展现了幽默感。",
                effects: {},
                add_tags: ["程序员"]
            },
            {
                text: "I'm fine, thank you. And you?",
                result: "{user}标准的回答让外教满意地点了点头。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}标准的回答让外教满意地点了点头，学习成绩提升了。"
                    ) || {
                        result: "{user}标准的回答让外教满意地点了点头，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_math_apple_cooking": {
        title: "数学课：煮苹果",
        description: "数学老师提问：煮一个苹果需要3分钟，煮三个苹果需要多少分钟？{user}回答：",
        trigger_conditions: { 
            age_range: [6, 13], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "1+1=3",
                result: "{user}的答案石破天惊，老师决定给个机会。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的答案石破天惊，老师决定给个机会，学习成绩提升了。"
                    ) || {
                        result: "{user}的答案石破天惊，老师决定给个机会，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "条件不足，此题无解",
                result: "{user}的回答非常严谨，但可能有点钻牛角尖。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答非常严谨，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答非常严谨，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "9分钟",
                result: "{user}的回答中规中矩。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答中规中矩，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答中规中矩，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "3分钟",
                result: "{user}的回答显示了灵活的思维。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "学习成绩:", 
                        1, 
                        "{user}的回答显示了灵活的思维，学习成绩提升了。"
                    ) || {
                        result: "{user}的回答显示了灵活的思维，学习成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_art_drawing": {
        title: "美术课：画画",
        description: "美术老师让大家画一幅我的梦想，{user}画的是：",
        trigger_conditions: { 
            age_range: [6, 13], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "画一个宇航员",
                result: "{user}画了一个穿着太空服的宇航员，展现了探索宇宙的梦想。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "美术成绩:", 
                        2, 
                        "{user}画了一个穿着太空服的宇航员，美术成绩提升了。"
                    ) || {
                        result: "{user}画了一个穿着太空服的宇航员，美术成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "画一个超级英雄",
                result: "{user}画了一个拯救世界的超级英雄，充满了正义感。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "美术成绩:", 
                        2, 
                        "{user}画了一个拯救世界的超级英雄，美术成绩提升了。"
                    ) || {
                        result: "{user}画了一个拯救世界的超级英雄，美术成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "画一个科学家",
                result: "{user}画了一个在实验室做实验的科学家，展现了探索科学的梦想。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "美术成绩:", 
                        2, 
                        "{user}画了一个在实验室做实验的科学家，美术成绩提升了。"
                    ) || {
                        result: "{user}画了一个在实验室做实验的科学家，美术成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "画一个老师",
                result: "{user}画了一个站在讲台上的老师，展现了教书育人的梦想。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "美术成绩:", 
                        2, 
                        "{user}画了一个站在讲台上的老师，美术成绩提升了。"
                    ) || {
                        result: "{user}画了一个站在讲台上的老师，美术成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "画一个蛋糕",
                result: "{user}画了一个巨大的蛋糕，看来是个吃货。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "美术成绩:", 
                        1, 
                        "{user}画了一个巨大的蛋糕，美术成绩略有提升。"
                    ) || {
                        result: "{user}画了一个巨大的蛋糕，美术成绩略有提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },
    
    "elementary_science_experiment": {
        title: "自然课：实验",
        description: "自然课上，老师让大家做一个小实验，{user}的选择是：",
        trigger_conditions: { 
            age_range: [6, 13], 
            required_tags: ["小学生"] 
        },
        options: [
            {
                text: "做水变色的实验",
                result: "{user}用食用色素让水变色，实验很成功。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "自然成绩:", 
                        2, 
                        "{user}做水变色的实验很成功，自然成绩提升了。"
                    ) || {
                        result: "{user}做水变色的实验很成功，自然成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "做气球吹大的实验",
                result: "{user}用醋和小苏打让气球变大，实验很有趣。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "自然成绩:", 
                        2, 
                        "{user}做气球吹大的实验很有趣，自然成绩提升了。"
                    ) || {
                        result: "{user}做气球吹大的实验很有趣，自然成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "做磁铁实验",
                result: "{user}用磁铁吸引各种物品，发现了磁性的奥秘。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "自然成绩:", 
                        3, 
                        "{user}做磁铁实验发现了磁性的奥秘，自然成绩大幅提升。"
                    ) || {
                        result: "{user}做磁铁实验发现了磁性的奥秘，自然成绩大幅提升。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "做植物生长实验",
                result: "{user}种了一颗豆子，观察它的生长过程。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "自然成绩:", 
                        2, 
                        "{user}做植物生长实验很认真，自然成绩提升了。"
                    ) || {
                        result: "{user}做植物生长实验很认真，自然成绩提升了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            },
            {
                text: "偷偷玩手机",
                result: "{user}没有认真做实验，而是偷偷玩起了手机。",
                effects: {},
                dynamic_result: function (player) {
                    return window.tagUtils?.updateDynamicTag(
                        player, 
                        "自然成绩:", 
                        -2, 
                        "{user}没有认真做实验，自然成绩下降了。"
                    ) || {
                        result: "{user}没有认真做实验，自然成绩下降了。",
                        effects: {},
                        add_tags: [],
                        remove_tags: []
                    };
                }
            }
        ]
    },

    // 狸猫相关事件
    "tanuki_friend_event": {
        title: "狸猫再会",
        description: "那只来自未来的狸猫又出现在{user}面前，带来了一些消息...",
        trigger_conditions: {
            required_tags: ["狸猫朋友"],
            age_range: [8, 18]
        },
        options: [
            {
                text: "倾听它的建议",
                result: "{user}认真听取了狸猫的指引，避开了一些人生的坎坷。",
                effects: { luck: 20, intelligence: 10 },
                add_tags: ["命运眷顾"]
            },
            {
                text: "分享自己的生活",
                result: "{user}和狸猫分享了近况，它似乎对{user}的成长很满意。",
                effects: { social: 15, luck: 10 },
                add_tags: []
            },
            {
                text: "再来一盘昆特牌",
                result: "{user}和狸猫又玩了一场昆特牌，这次{user}赢了！狸猫欣慰地看着{user}成长的智慧。",
                effects: { intelligence: 20, luck: 5 },
                add_tags: ["昆特牌大师"]
            }
        ]
    },

    "flying_adventure": {
        title: "天空奇遇",
        description: "有了竹蜻蜓后，{user}可以自由飞翔，今天{user}决定飞往...",
        trigger_conditions: {
            required_tags: ["飞行能力"],
            age_range: [6, 18]
        },
        options: [
            {
                text: "城市上空",
                result: "{user}飞越城市上空，从全新的视角看到了这个世界，眼界大开。",
                effects: { intelligence: 15, social: 10 },
                add_tags: ["开阔视野"]
            },
            {
                text: "学校",
                result: "{user}飞到学校屋顶，悄悄观察同学们，发现了许多有趣的事情。",
                effects: { intelligence: 10, social: 5 },
                add_tags: ["观察力增强"]
            },
            {
                text: "山顶",
                result: "{user}飞到高山之巅，感受云雾环绕的奇妙体验，仿佛置身仙境。",
                effects: { health: 15, luck: 10 },
                add_tags: ["亲近自然"]
            },
            {
                text: "帮助别人",
                result: "{user}利用飞行能力救助了一个陷入危险的孩子，成为了小英雄。",
                effects: { social: 20, luck: 15 },
                add_tags: ["少年英雄"]
            }
        ]
    },

    "teleportation_event": {
        title: "如意门冒险",
        description: "有了如意门，{user}可以瞬间到达任何地方，今天{user}打算去...",
        trigger_conditions: {
            required_tags: ["如意门"],
            age_range: [6, 18]
        },
        options: [
            {
                text: "博物馆",
                result: "{user}在闭馆后的博物馆里独自参观，获得了丰富的知识。",
                effects: { intelligence: 25, luck: 5 },
                add_tags: ["博学多才"]
            },
            {
                text: "图书馆",
                result: "{user}在宁静的图书馆通宵阅读，知识水平大幅提升。",
                effects: { intelligence: 20, health: -5 },
                add_tags: ["知识渊博"]
            },
            {
                text: "世界各地",
                result: "{user}游历了世界各地的名胜古迹，开拓了视野。",
                effects: { intelligence: 15, social: 15, health: 10 },
                add_tags: ["世界旅行者"]
            },
            {
                text: "帮助迷路的小朋友",
                result: "{user}利用如意门帮助了一些迷路的孩子回家，获得了好评。",
                effects: { social: 20, luck: 10 },
                add_tags: ["乐于助人"]
            }
        ]
    }
};

// 暴露到全局
window.TAG_EVENTS = TAG_EVENTS;