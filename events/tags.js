// events/tags.js - 标签定义文件

const TAG_DEFINITIONS = new Map([
    // 基础标签 - 基本人口学特征
    ["富二代", {
        description: "出生在富裕家庭",
        exclusive_events: [],
        priority_events: ["luxury_school", "investment_opportunity"]
    }],
    ["男性", {
        description: "男性角色",
        exclusive_events: [],
        priority_events: ["military_service"]
    }],
    ["女性", {
        description: "女性角色",
        exclusive_events: [],
        priority_events: ["female_career"]
    }],
    ["小学生", {
        description: "正在上小学",
        exclusive_events: [],
        priority_events: [
            "elementary_homework_nightmare", 
            "elementary_science_fair", 
            "elementary_sports_day", 
            "elementary_art_class", 
            "elementary_music_recital", 
            "elementary_english_class", 
            "elementary_english_fill_blank", 
            "elementary_pe_running", 
            "elementary_music_singing", 
            "elementary_math_problem", 
            "elementary_math_apple_count",
            "elementary_foreign_teacher_greeting",
            "elementary_art_drawing",
            "elementary_science_experiment",
            "elementary_math_apple_cooking"
        ]
    }],
    
    // 性格标签 - 人物性格特点
    ["高情商", {
        description: "拥有超凡的情商和沟通能力",
        exclusive_events: [],
        priority_events: ["negotiation_event", "social_success"]
    }],
    ["诚实", {
        description: "为人诚实正直",
        exclusive_events: [],
        priority_events: []
    }],
    ["勇敢", {
        description: "具有勇敢的品质",
        exclusive_events: [],
        priority_events: ["bravery_event"]
    }],
    ["胆小", {
        description: "具有胆小的品质",
        exclusive_events: [],
        priority_events: []
    }],
    ["热情", {
        description: "热情开朗的性格",
        exclusive_events: [],
        priority_events: ["enthusiasm_event"]
    }],
    ["冷漠", {
        description: "冷漠的性格",
        exclusive_events: [],
        priority_events: []
    }],
    ["实用主义", {
        description: "注重实际效果",
        exclusive_events: [],
        priority_events: ["pragmatism_event"]
    }],
    ["疑心重", {
        description: "容易怀疑他人或事物",
        exclusive_events: [],
        priority_events: []
    }],
    ["老成", {
        description: "性格成熟稳重",
        exclusive_events: [],
        priority_events: ["maturity_event"]
    }],
    ["情绪化", {
        description: "情绪波动较大或表达直接",
        exclusive_events: [],
        priority_events: []
    }],
    ["叛逆", {
        description: "具有叛逆精神",
        exclusive_events: [],
        priority_events: []
    }],
    ["直觉派", {
        description: "做事依赖直觉",
        exclusive_events: [],
        priority_events: []
    }],
    ["感性化", {
        description: "思考问题偏于感性",
        exclusive_events: [],
        priority_events: []
    }],
    ["浪漫", {
        description: "富有浪漫情怀",
        exclusive_events: [],
        priority_events: []
    }],
    
    // 兴趣标签 - 人物爱好和兴趣
    ["编程", {
        description: "对编程和计算机有浓厚兴趣",
        exclusive_events: [],
        priority_events: []
    }],
    ["科幻", {
        description: "喜欢科幻故事和概念",
        exclusive_events: [],
        priority_events: []
    }],
    ["玛丽苏", {
        description: "有玛丽苏倾向",
        exclusive_events: [],
        priority_events: []
    }],
    ["元宇宙", {
        description: "对虚拟世界和元宇宙概念感兴趣",
        exclusive_events: [],
        priority_events: []
    }],
    ["神话爱好者", {
        description: "喜欢研究神话传说",
        exclusive_events: [],
        priority_events: []
    }],
    ["进化论", {
        description: "相信或常思考进化论",
        exclusive_events: [],
        priority_events: []
    }],
    ["技术宅", {
        description: "热爱并钻研技术",
        exclusive_events: [],
        priority_events: []
    }],
    ["阴谋论者", {
        description: "倾向于相信阴谋论",
        exclusive_events: [],
        priority_events: []
    }],
    ["哲学", {
        description: "喜欢思考哲学问题",
        exclusive_events: [],
        priority_events: []
    }],
    ["文艺青年", {
        description: "具有文艺气息和情怀",
        exclusive_events: [],
        priority_events: []
    }],
    ["天文爱好者", {
        description: "对天文学和宇宙着迷",
        exclusive_events: [],
        priority_events: []
    }],
    ["动物爱好者", {
        description: "喜爱动物并关心它们",
        exclusive_events: [],
        priority_events: []
    }],
    ["二次元", {
        description: "沉浸在二次元文化中",
        exclusive_events: [],
        priority_events: []
    }],
    ["艺术家", {
        description: "具有艺术家的气质和视角",
        exclusive_events: [],
        priority_events: []
    }],
    ["修仙", {
        description: "对修仙玄幻文化感兴趣",
        exclusive_events: [],
        priority_events: []
    }],
    ["动物关怀", {
        description: "关心动物福利",
        exclusive_events: [],
        priority_events: []
    }],
    
    // 背景标签 - 人物成长经历和背景
    ["网吧养大", {
        description: "在网吧环境中长大",
        exclusive_events: [],
        priority_events: ["internet_addiction_risk", "street_smart_event"]
    }],
    ["葫芦娃", {
        description: "拥有特殊能力的孩子",
        exclusive_events: ["gourd_power_awakening"],
        priority_events: ["special_ability_event"]
    }],
    ["医学奇迹", {
        description: "经历过医学奇迹",
        exclusive_events: [],
        priority_events: ["medical_research", "health_interview"]
    }],
    ["神圣预言", {
        description: "身负神秘预言",
        exclusive_events: ["prophecy_fulfillment"],
        priority_events: ["mysterious_encounter"]
    }],
    ["死婴", {
        description: "死而复生的奇迹婴儿",
        exclusive_events: [],
        priority_events: ["miracle_recovery", "supernatural_event"]
    }],
    ["厨师家庭", {
        description: "出生在厨师家庭",
        exclusive_events: [],
        priority_events: ["cooking_event", "food_business"]
    }],
    ["地狱难度", {
        description: "极端困难的人生起点",
        exclusive_events: [],
        priority_events: ["survival_event", "hardship_event"]
    }],
    ["失忆", {
        description: "失去了过去的记忆",
        exclusive_events: [],
        priority_events: ["memory_recovery", "identity_discovery"]
    }],
    
    // 能力标签 - 人物特殊能力和技能
    ["记忆超群", {
        description: "具有超强的记忆力",
        exclusive_events: [],
        priority_events: ["memory_competition"]
    }],
    ["洞察力", {
        description: "具有深刻的洞察力",
        exclusive_events: [],
        priority_events: ["insight_event","observation_competition"]
    }],
    ["逻辑思维", {
        description: "具有强大的逻辑思维能力",
        exclusive_events: [],
        priority_events: ["logic_competition"]
    }],
    ["创造力", {
        description: "具有丰富的创造力",
        exclusive_events: [],
        priority_events: ["creativity_event","imagination_event"]
    }],
    ["身体协调", {
        description: "具有优秀的身体协调能力",
        exclusive_events: [],
        priority_events: ["coordination_event"]
    }],
    ["逻辑鬼才", {
        description: "拥有非凡的逻辑思维能力",
        exclusive_events: [],
        priority_events: []
    }],
    ["生活观察", {
        description: "善于观察生活中的细节",
        exclusive_events: [],
        priority_events: []
    }],
    ["诗意", {
        description: "言行举止带有诗意",
        exclusive_events: [],
        priority_events: []
    }],
    ["逻辑循环", {
        description: "思维容易陷入逻辑循环",
        exclusive_events: [],
        priority_events: []
    }],
    ["拟人化", {
        description: "喜欢将事物拟人化看待",
        exclusive_events: [],
        priority_events: []
    }],
    ["几何直觉", {
        description: "对几何图形有良好直觉",
        exclusive_events: [],
        priority_events: []
    }],
    ["身体联想", {
        description: "善于用身体动作进行联想",
        exclusive_events: [],
        priority_events: []
    }],
    ["数学化", {
        description: "倾向于用数学方式理解事物",
        exclusive_events: [],
        priority_events: []
    }],
    ["研究精神", {
        description: "喜欢深入研究事物",
        exclusive_events: [],
        priority_events: []
    }],
    ["经济学", {
        description: "对经济学原理感兴趣",
        exclusive_events: [],
        priority_events: []
    }],
    ["科学思维", {
        description: "习惯用科学方法思考问题",
        exclusive_events: [],
        priority_events: []
    }],
    ["学生思维", {
        description: "典型的学生式想法",
        exclusive_events: [],
        priority_events: []
    }],
    ["飞行能力", {
        description: "拥有飞行的能力",
        exclusive_events: [],
        priority_events: []
    }],
    
    // 动态标签 - 可随游戏进程变化的数值
    ["音乐天赋", {
        description: "音乐方面的天赋水平",
        is_dynamic: true,
        prefix: "音乐天赋:",
        exclusive_events: [],
        priority_events: ["music_competition", "music_scholarship"]
    }],
    ["学习成绩", {
        description: "学习成绩水平",
        is_dynamic: true,
        prefix: "学习成绩:",
        exclusive_events: [],
        priority_events: ["academic_competition", "scholarship_opportunity"]
    }],
    ["美术天赋", {
        description: "美术成绩水平",
        is_dynamic: true,
        prefix: "美术天赋:",
        exclusive_events: [],
        priority_events: ["art_competition"]
    }],
    
    // 红色标签 - 特殊负面状态
    ["诅咒之子", {
        description: "被神秘力量诅咒",
        is_red: true,
        exclusive_events: ["curse_event"],
        priority_events: []
    }],
    ["绝症", {
        description: "患有无法治愈的疾病",
        is_red: true,
        exclusive_events: ["terminal_illness_event"],
        priority_events: []
    }],
    ["通缉犯", {
        description: "被警方通缉",
        is_red: true,
        exclusive_events: ["fugitive_event"],
        priority_events: []
    }],
    ["恶魔契约", {
        description: "与恶魔签订了契约",
        is_red: true,
        exclusive_events: ["demon_contract_event"],
        priority_events: []
    }],
    
    // 物品标签 - 角色拥有的特殊物品
    ["神奇道具", {
        description: "从狸猫那里获得的神奇道具",
        exclusive_events: [],
        priority_events: ["tanuki_gift_choice"]
    }],
    ["如意门", {
        description: "拥有可以传送到任何地方的神奇道具",
        exclusive_events: [],
        priority_events: []
    }],
    
    // 状态标签 - 角色当前状态
    ["学霸", {
        description: "学习成绩优异",
        exclusive_events: ["academic_competition"],
        priority_events: ["scholarship_opportunity", "research_project"]
    }],
    ["运动健将", {
        description: "体育方面表现出色",
        exclusive_events: ["sports_competition"],
        priority_events: ["sports_team_invitation"]
    }],
    ["为人父母", {
        description: "已经有了孩子",
        exclusive_events: [],
        priority_events: ["parenting_event", "child_education"]
    }],
    ["企业家", {
        description: "成功创业",
        exclusive_events: [],
        priority_events: ["business_expansion", "investment_decision"]
    }],
    ["交网友", {
        description: "热衷于网络社交",
        exclusive_events: [],
        priority_events: ["online_friend_event", "internet_adventure"]
    }],
    ["长翅膀", {
        description: "天生拥有翅膀",
        exclusive_events: ["flying_event"],
        priority_events: ["wing_related_event"]
    }],
    ["鸟人", {
        description: "曾经救助过小鸟",
        exclusive_events: [],
        priority_events: ["animal_rescue", "nature_event"]
    }],
    ["慈善家", {
        description: "热心公益事业",
        exclusive_events: [],
        priority_events: ["charity_event", "donation_request"]
    }],
    ["狸猫朋友", {
        description: "与一只来自未来的狸猫成为朋友",
        exclusive_events: [],
        priority_events: []
    }]
        // 人物标签 - 角色与特定人物的关系
]);

// 暴露到全局
window.TAG_DEFINITIONS = TAG_DEFINITIONS;