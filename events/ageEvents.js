// ageEvents.js - 年龄段相关事件

const ageEvents = {
    // 幼儿事件 (1-5岁)
    toddler: {
        "learning_to_walk": {
            title: "学会走路",
            description: "{user}____的时候突然学会了走路。",
            trigger_conditions: {
                age_range: [1, 2]
            },
            options: [
                {
                    text: "闯祸了被人追着打",
                    result: "{user}刚学会走路就到处闯祸，被邻居追着满街跑。",
                    effects: { health: -5, social: 10 },
                    add_tags: ["勇敢"]
                },
                {
                    text: "吃脚趾",
                    result: "{user}发现了脚趾这个神奇的玩具，经常抱着啃。",
                    effects: { health: 5, intelligence: -5 },
                    add_tags: []
                },
                {
                    text: "和狗抢东西吃",
                    result: "{user}和家里的狗狗成了好朋友，经常一起分享食物。",
                    effects: { health: -3, social: 8 },
                    add_tags: ["动物朋友"]
                },
                {
                    text: "跟鸡学习",
                    result: "{user}观察院子里的鸡，学会了独特的走路方式。",
                    effects: { intelligence: 5, social: 5 },
                    add_tags: ["观察力"]
                },
                {
                    text: "在某站看攻略",
                    result: "{user}竟然会用平板看走路教程，真是个天才宝宝！",
                    effects: { intelligence: 15 },
                    add_tags: ["交网友"]
                },
                {
                    text: "走路还用学？",
                    result: "{user}天生就会走路，把大人们都惊呆了。",
                    effects: { health: 10, luck: 10 },
                    add_tags: ["天赋异禀"]
                }
            ]
        },

        "wolf_at_door": {
            title: "大灰狼来了",
            description: "有一天有一只人模样的狼敲门，说是{user}的外婆，{user}独自在家，{user}____",
            trigger_conditions: {
                age_range: [1, 3]
            },
            options: [
                {
                    text: "打电话报警",
                    result: "{user}机智地打电话报警，警察及时赶到抓住了坏人。",
                    effects: { intelligence: 15, social: 10 },
                    add_tags: ["勇敢"]
                },
                {
                    text: "沏茶、迎客",
                    result: "{user}天真地打开门迎接'外婆'...",
                    effects: { health: -100 },
                    risk: 1.0
                },
                {
                    text: "装作不在家",
                    result: "{user}屏住呼吸，一动不动，'外婆'最终离开了。",
                    effects: { intelligence: 10, luck: 5 },
                    add_tags: ["谨慎"]
                },
                {
                    text: "隔着门唱起了歌：小兔子乖乖",
                    result: "{user}唱起了儿歌，'外婆'听到后知道孩子有警惕心，悻悻离开。",
                    effects: { intelligence: 8, social: 8 },
                    add_tags: ["音乐"]
                }
            ]
        },

        "strange_tanuki_encounter": {
            title: "陌生的大狸猫",
            description: "有一天，{user}的抽屉里爬出一只巨大的狸猫，说是{user}孙子从未来派它来帮助{user}。{user}独自在家，{user}___",
            weight: 8,
            trigger_conditions: {
                age_range: [1, 3],  // 适合幼儿阶段
                not_tags: [] 
            },
            options: [
                {
                    text: "打电话报警",
                    result: "{user}慌张地拨打了报警电话，但警察到达后什么也没找到，狸猫早已消失不见。{user}被当作恶作剧处理。",
                    effects: { 
                        social: -10, 
                        luck: -5,
                        intelligence: 5  // 学会了理性思考
                    },
                    add_tags: ["谨慎"]
                },
                {
                    text: "泡茶，迎客",
                    result: "{user}礼貌地为狸猫泡了茶。狸猫很感动，送给了{user}一个神奇的道具作为礼物，并承诺会在关键时刻帮助{user}。",
                    effects: { 
                        luck: 20, 
                        social: 15,
                        intelligence: 10
                    },
                    add_tags: ["神奇道具"],
                    continue_event: "tanuki_gift_choice"
                },
                {
                    text: "挥挥手，说来盘昆特牌吧",
                    result: "{user}提议玩昆特牌。狸猫大笑，原来它也是昆特牌高手！一场激烈的对决后，{user}技艺大增。",
                    effects: { 
                        intelligence: 15, 
                        social: 10,
                        luck: 5
                    },
                    add_tags: ["狸猫朋友"]
                },
                {
                    text: "装作不在家",
                    result: "{user}躲在角落装作不在家。狸猫摇摇头离开了，留下一句话：'勇气不足的人无法改变命运。'",
                    effects: { 
                        social: -5, 
                        luck: -10,
                        health: -5  // 错过了机会
                    },
                    add_tags: []
                },
                {
                    text: "我不认识什么叮当",
                    result: "{user}困惑地表示不认识任何叫'叮当'的人。狸猫解释说可能时间线有误。",
                    effects: { 
                        intelligence: 12, 
                        luck: 8,
                        social: 5
                    },
                    add_tags: []
                }
            ]
        },

        "tanuki_gift_choice": {
            title: "狸猫的礼物",
            description: "狸猫拿出了几样神奇的道具，让{user}选择一样作为礼物...",
            trigger_conditions: {
                required_tags: ["神奇道具"],
                age_range: [1, 3]
            },
            options: [
                {
                    text: "记忆面包",
                    result: "{user}选择了记忆面包。从此学习变得轻松许多，但也变得有些依赖这种捷径。",
                    effects: { 
                        intelligence: 25,
                        social: -5  // 有些脱离现实
                    },
                    add_tags: [],
                    remove_tags: ["神奇道具"]
                },
                {
                    text: "竹蜻蜓",
                    result: "{user}选择了竹蜻蜓。能够自由飞翔让{user}看到了更广阔的世界，视野和胸怀都更加开阔。",
                    effects: { 
                        luck: 15,
                        social: 10,
                        health: 10
                    },
                    add_tags: ["飞行能力"],
                    remove_tags: ["神奇道具"]
                },
                {
                    text: "如意门",
                    result: "{user}选择了如意门。能够瞬间到达任何地方",
                    effects: { 
                        intelligence: 15,
                        social: 20,
                        luck: 10
                    },
                    add_tags: ["如意门"],
                    remove_tags: ["神奇道具"]
                },
                {
                    text: "什么都不要，保持平凡",
                    result: "{user}礼貌地拒绝了礼物，表示平凡的生活就很好。狸猫很赞赏{user}的品格，祝福{user}一生平安。",
                    effects: { 
                        health: 15,
                        social: 15,
                        luck: 10
                    },
                    add_tags: [],
                    remove_tags: ["神奇道具"]
                }
            ]
        },

        "start_school": {
            title: "开始上学",
            description: "4岁时开始上学，成为了祖国花朵。",
            trigger_conditions: {
                age_range: [4, 4],
                excluded_tags: ["小学生"]
            },
            options: [
                {
                    text: "继续",
                    result: "{user}背上小书包，开始了学习生涯。",
                    effects: { intelligence: 5 },
                    add_tags: ["小学生"]
                }
            ]
        },

        "toddler_early_talents": {
            title: "从小就...",
            description: "{user}从小就展现出一些与众不同的特质。",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "和小动物说话",
                    result: "{user}发现自己似乎有和小动物沟通的潜能。",
                    effects: {},
                    add_tags: ["动物朋友"]
                },
                {
                    text: "身体折起来",
                    result: "{user}的身体异常柔韧，可以做出各种高难度动作。",
                    effects: {},
                    add_tags: ["身体协调"]
                },
                {
                    text: "过目不忘",
                    result: "{user}展现出惊人的记忆力，很多事情看过一遍就能记住。",
                    effects: { intelligence: 5 },
                    add_tags: ["记忆超群"]
                },
                {
                    text: "粗口",
                    result: "{user}小小年纪就学会了各种粗口，并运用自如，展现出一种独特的'高情商'。",
                    effects: {},
                    add_tags: ["高情商"]
                },
                {
                    text: "酗酒",
                    result: "{user}不知从哪里学会了喝酒，并对此产生了兴趣，身体也因此变差了。",
                    effects: { health: -10 },
                    add_tags: ["多病"]
                }
            ]
        },

        "toddler_animal_talk_choice": {
            title: "与谁对话？",
            description: "{user}发现自己能和特定动物讲话，会是谁呢？",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "海豚",
                    result: "{user}发现自己能听懂海豚的歌声，并从中感受到音乐的魅力。",
                    effects: {},
                    add_tags: ["音乐"]
                },
                {
                    text: "鸡",
                    result: "{user}和鸡你一言我一语，竟然领悟了神秘的'坤学'。",
                    effects: {},
                    add_tags: ["坤学"]
                },
                {
                    text: "四维蜈蚣",
                    result: "{user}与一只来自高维度的蜈蚣进行了深奥的交流，获得了量子启蒙。",
                    effects: { intelligence: 10 },
                    add_tags: ["科幻"]
                },
                {
                    text: "狗",
                    result: "{user}能和狗狗无障碍交流，成为了远近闻名的'狗之友'。",
                    effects: { social: 5 },
                    add_tags: ["动物朋友", "狗之友"]
                },
                {
                    text: "蛇",
                    result: "{user}与蛇对话，似乎觉醒了某种古老的巫师血脉。",
                    effects: { luck: 5 },
                    add_tags: ["巫师血脉"]
                },
                {
                    text: "笛卡尔鸭",
                    result: "{user}和一只会思考的鸭子讨论哲学，脑洞大开。",
                    effects: { intelligence: 5 },
                    add_tags: ["哲学"]
                }
            ]
        },

        "toddler_daily_activities": {
            title: "幼儿日常",
            description: "{user}在幼儿时期有许多日常活动。",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "喜欢看电视",
                    result: "{user}沉迷于看电视，小小年纪就戴上了眼镜。",
                    effects: { health: -5 },
                    add_tags: ["近视眼"]
                },
                {
                    text: "对玩具非常执着",
                    result: "{user}对特定的玩具有着非同寻常的喜爱。",
                    effects: {},
                    continue_event: "toddler_favorite_toy"
                },
                {
                    text: "喜欢户外活动",
                    result: "{user}热爱户外活动，身体素质很好。",
                    effects: { health: 10 },
                    add_tags: []
                },
                {
                    text: "喜欢画画",
                    result: "{user}很喜欢涂涂画画，展现了艺术天赋。",
                    effects: { intelligence: 5 },
                    add_tags: ["艺术细胞"]
                },
                {
                    text: "喜欢听故事",
                    result: "{user}喜欢听大人讲故事，培养了想象力。",
                    effects: { intelligence: 5 },
                    add_tags: ["创造力"]
                }
            ]
        },

        "toddler_favorite_toy": {
            title: "最爱的玩具",
            description: "{user}最喜欢玩的玩具是：",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "十万片的拼图",
                    result: "{user}对复杂的拼图展现出惊人的耐心和记忆力。",
                    effects: { intelligence: 5 },
                    add_tags: ["记忆超群"]
                },
                {
                    text: "四驱车",
                    result: "{user}热衷于四驱车比赛，从小就培养了好胜心。",
                    effects: {},
                    add_tags: ["好胜"]
                },
                {
                    text: "吸喜羊羊",
                    result: "{user}是吸羊羊的忠实粉丝。",
                    effects: {},
                    add_tags: ["吸羊羊"]
                },
                {
                    text: "彩虹小马",
                    result: "{user}非常喜欢彩虹小马。",
                    effects: {},
                    add_tags: ["彩虹小马"]
                },
                {
                    text: "超人变身器",
                    result: "{user}整天梦想着变身超人拯救世界，有点中二。",
                    effects: {},
                    add_tags: ["中二病"]
                },
                {
                    text: "电子琴",
                    result: "{user}喜欢在电子琴上敲敲打打，展现出音乐天赋。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentLevel = 0;
                        const levelTagPrefix = "音乐天赋:";
                        const existingLevelTag = player.tags.find(tag => tag.startsWith(levelTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(levelTagPrefix));
                        if (existingLevelTag) {
                            currentLevel = parseInt(existingLevelTag.split(":")[1]);
                        }
                        newTags.push(`${levelTagPrefix}${currentLevel + 1}`);
                        return {
                            result: "{user}喜欢在电子琴上敲敲打打，音乐天赋提升了。",
                            effects: {},
                            add_tags: newTags,
                            remove_tags: existingLevelTag ? [existingLevelTag] : []
                        };
                    }
                },
                {
                    text: "拐杖",
                    result: "{user}把拐杖当成了玩具，舞得虎虎生风，身体协调性得到了锻炼。",
                    effects: {},
                    add_tags: ["身体协调"]
                },
                {
                    text: "九连环",
                    result: "{user}沉迷于解九连环，并乐在其中，似乎有点受虐倾向。",
                    effects: { intelligence: 3 },
                    add_tags: ["受虐狂"]
                }
            ]
        },

        "toddler_playtime_habits": {
            title: "玩耍方式",
            description: "{user}在玩耍时总有特别的偏好：",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "乱打电话",
                    result: "{user}喜欢拿着电话乱按一通，有时还真接通了奇怪的电话，胆子越来越大。",
                    effects: {},
                    add_tags: ["勇敢"]
                },
                {
                    text: "做迷藏",
                    result: "{user}热衷于玩捉迷藏，总能想到一些匪夷所思的藏身之处。",
                    effects: { intelligence: 2 },
                    add_tags: ["创造力"]
                },
                {
                    text: "跟自己赛跑",
                    result: "{user}喜欢和自己赛跑，不断挑战自己的极限，培养了好胜心。",
                    effects: { health: 2 },
                    add_tags: ["好胜"]
                },
                {
                    text: "挖洞",
                    result: "{user}对挖洞情有独钟，似乎想挖穿地球，胆识过人。",
                    effects: {},
                    add_tags: ["勇敢"]
                },
                {
                    text: "扔积木",
                    result: "{user}喜欢把积木扔得到处都是，并在混乱中寻找规律，锻炼了洞察力。",
                    effects: { intelligence: 1 },
                    add_tags: ["洞察力"]
                },
                {
                    text: "开演唱会",
                    result: "{user}经常在家举办个人演唱会，歌声虽然稚嫩但充满热情。",
                    effects: {},
                    add_tags: ["音乐天赋"]
                },
                {
                    text: "玩昆特牌",
                    result: "{user}小小年纪就学会了打昆特牌，并展现出不俗的逻辑思维。",
                    effects: { intelligence: 3 },
                    add_tags: ["昆特牌"]
                },
                {
                    text: "假装是机器人",
                    result: "{user}喜欢模仿机器人说话走路，对AI产生了浓厚兴趣。",
                    effects: {},
                    add_tags: ["AI"]
                }
            ]
        },

        "toddler_sleep_habits_main": {
            title: "睡前习惯",
            description: "{user}在睡觉时有一些特别的习惯。",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "总是踢被子",
                    result: "{user}睡觉时总把被子踢开，但却很少感冒，体质强健。",
                    effects: { health: 5 },
                    add_tags: []
                },
                {
                    text: "喜欢抱着东西睡觉",
                    result: "{user}睡觉时总要抱着点什么才有安全感。",
                    effects: {},
                    continue_event: "toddler_sleep_comfort_object"
                },
                {
                    text: "经常说梦话",
                    result: "{user}睡觉时经常叽里咕噜说梦话，表达欲很强。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "很早就不用尿不湿",
                    result: "{user}很早就学会了控制自己，不再需要尿不湿。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "喜欢开小夜灯",
                    result: "{user}有点怕黑，睡觉时总要开着小夜灯。",
                    effects: {},
                    add_tags: ["怕黑"]
                },
                {
                    text: "总在床上蹦跳",
                    result: "{user}睡前总喜欢在床上蹦蹦跳跳，精力旺盛。",
                    effects: { health: 2 },
                    add_tags: ["多动症"]
                },
                {
                    text: "会自己哼摇篮曲",
                    result: "{user}会自己哼着不成调的摇篮曲哄自己睡觉，展现了音乐天赋。",
                    effects: {},
                    add_tags: ["音乐天赋"]
                },
                {
                    text: "喜欢数羊入睡",
                    result: "{user}学会了数羊帮助睡眠，意外地进行了数学启蒙。",
                    effects: { intelligence: 1 },
                    add_tags: []
                },
                {
                    text: "经常做奇怪的梦",
                    result: "{user}的梦境总是光怪陆离，充满了想象力。",
                    effects: {},
                    add_tags: ["创造力"]
                },
                {
                    text: "睡觉时喜欢咬手指",
                    result: "{user}睡觉时总是不自觉地咬手指。",
                    effects: {},
                    add_tags: ["焦虑"]
                }
            ]
        },

        "toddler_sleep_comfort_object": {
            title: "抱着什么入睡？",
            description: "{user}喜欢抱着什么东西睡觉呢？",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "泰迪熊",
                    result: "{user}抱着泰迪熊睡觉，内心充满了温柔。",
                    effects: {},
                    add_tags: ["泰迪熊"]
                },
                {
                    text: "枕头",
                    result: "{user}抱着枕头睡觉，是个讲究实用的人。",
                    effects: {},
                    add_tags: ["实用主义"]
                },
                {
                    text: "妈妈的衣服",
                    result: "{user}抱着带有妈妈气味的衣服睡觉，有点恋母情结。",
                    effects: {},
                    add_tags: ["恋母情结"]
                },
                {
                    text: "自制的布娃娃",
                    result: "{user}抱着自己缝制的布娃娃睡觉，从小就是手工达人。",
                    effects: {},
                    add_tags: ["手工"]
                },
                {
                    text: "一本书",
                    result: "{user}抱着书本睡觉，展现出学霸潜质。",
                    effects: { intelligence: 2 },
                    add_tags: []
                },
                {
                    text: "遥控器",
                    result: "{user}抱着遥控器睡觉，是个不折不扣的科技宅。",
                    effects: {},
                    add_tags: ["科技宅"]
                },
                {
                    text: "鱼缸",
                    result: "{user}抱着鱼缸睡觉。",
                    effects: {},
                    add_tags: ["海洋学者"]
                }
            ]
        },

        "toddler_eating_habits_main": {
            title: "饮食偏好",
            description: "{user}在饮食方面有一些特别的偏好和习惯。",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "只吃甜食",
                    result: "{user}酷爱甜食，但也因此长了蛀牙。",
                    effects: { health: -5 },
                    add_tags: ["甜"]
                },
                {
                    text: "讨厌蔬菜",
                    result: "{user}对某些蔬菜非常抗拒。",
                    effects: {},
                    continue_event: "toddler_hated_vegetable"
                },
                {
                    text: "喜欢模仿大人喝茶",
                    result: "{user}喜欢学大人一样喝茶，显得有些老成。",
                    effects: {},
                    add_tags: ["老成"]
                },
                {
                    text: "总是狼吞虎咽",
                    result: "{user}吃饭总是狼吞虎咽，是个急性子。",
                    effects: {},
                    add_tags: ["急性子"]
                },
                {
                    text: "喜欢用手抓饭",
                    result: "{user}喜欢用手直接抓饭吃，对触觉特别敏感。",
                    effects: {},
                    add_tags: ["触觉敏感"]
                },
                {
                    text: "经常剩饭",
                    result: "{user}吃饭总是剩很多，养成了浪费的习惯。",
                    effects: {},
                    add_tags: ["浪费"]
                },
                {
                    text: "喜欢帮忙做饭",
                    result: "{user}喜欢在厨房帮忙，是个有潜力的小厨神。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "只喝白开水",
                    result: "{user}从小就只爱喝白开水，是个养生达人。",
                    effects: { health: 3 },
                    add_tags: []
                },
                {
                    text: "喜欢尝试新食物",
                    result: "{user}对没吃过的食物都充满好奇，勇于尝试。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "会自己使用筷子",
                    result: "{user}很早就学会了使用筷子，手眼协调能力不错。",
                    effects: {},
                    add_tags: ["身体协调"]
                }
            ]
        },

        "toddler_hated_vegetable": {
            title: "最讨厌的蔬菜",
            description: "{user}最讨厌的蔬菜是什么呢？",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "胡萝卜",
                    result: "{user}非常讨厌胡萝卜。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "青椒",
                    result: "{user}受不了青椒的味道，味觉特别敏感。",
                    effects: {},
                    add_tags: ["味觉敏感"]
                },
                {
                    text: "洋葱",
                    result: "{user}一闻到洋葱就想哭。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "苦瓜",
                    result: "{user}特别怕苦，对苦瓜深恶痛绝。",
                    effects: {},
                    add_tags: ["怕苦"]
                },
                {
                    text: "茄子",
                    result: "{user}不喜欢茄子软烂的口感和颜色，是个颜值控。",
                    effects: {},
                    add_tags: ["颜值控"]
                },
                {
                    text: "西兰花",
                    result: "{user}觉得西兰花长得像树，无法接受，有点强迫症。",
                    effects: {},
                    add_tags: ["强迫症"]
                },
                {
                    text: "菠菜",
                    result: "{user}不喜欢菠菜，看来是大力水手的黑粉。",
                    effects: {},
                    add_tags: []
                }
            ]
        },

        "toddler_social_behavior_main": {
            title: "社交表现",
            description: "{user}在与人交往时展现出不同的行为模式。",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "见到陌生人就躲",
                    result: "{user}见到陌生人就害羞地躲起来，有些社交恐惧。",
                    effects: { social: -3 },
                    add_tags: ["社恐"]
                },
                {
                    text: "喜欢当小老师",
                    result: "{user}喜欢扮演小老师的角色，教别人东西。",
                    effects: {},
                    continue_event: "toddler_teaching_preference"
                },
                {
                    text: "总是抢着回答问题",
                    result: "{user}在幼儿园总是积极抢答问题，表现欲很强。",
                    effects: { social: 2 },
                    add_tags: ["表现欲"]
                },
                {
                    text: "喜欢分享自己的零食",
                    result: "{user}乐于把自己的零食分享给小朋友，非常慷慨。",
                    effects: { social: 3 },
                    add_tags: []
                },
                {
                    text: "经常帮助小朋友",
                    result: "{user}看到别的小朋友有困难，总会主动上前帮助。",
                    effects: { social: 3 },
                    add_tags: ["助人为乐"]
                },
                {
                    text: "喜欢一个人玩",
                    result: "{user}更喜欢一个人沉浸在自己的世界里玩耍，独立性强。",
                    effects: {},
                    add_tags: ["内向"]
                },
                {
                    text: "会主动道歉",
                    result: "{user}做错事后会主动承认错误并道歉，情商颇高。",
                    effects: { social: 2 },
                    add_tags: ["高情商"]
                },
                {
                    text: "喜欢模仿大人说话",
                    result: "{user}喜欢模仿大人的语气和用词说话，学习能力很强。",
                    effects: { intelligence: 2 },
                    add_tags: []
                },
                {
                    text: "经常忘记别人名字",
                    result: "{user}总是记不住小朋友的名字，有点脸盲。",
                    effects: {},
                    add_tags: ["脸盲"]
                },
                {
                    text: "喜欢给别人起外号",
                    result: "{user}喜欢根据特点给别人起各种外号，展现出语言天赋。",
                    effects: {},
                    add_tags: ["语言天赋"]
                }
            ]
        },

        "toddler_teaching_preference": {
            title: "喜欢教什么？",
            description: "{user}当小老师时，最喜欢教别人什么呢？",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "算数",
                    result: "{user}喜欢教大家数数和简单的加减法，展现出数学天赋。",
                    effects: { intelligence: 2 },
                    add_tags: ["数学天赋"]
                },
                {
                    text: "唱歌",
                    dynamic_result: function (player) {
                        return updateDynamicTag(
                            player,
                            "音乐天赋:",  // 注意有冒号
                            1,           // 增加值
                            "{user}的音乐天赋提升了。" // 结果文本
                        );
                    }
                },
                {
                    text: "画画",
                    dynamic_result: function (player) {
                        return updateDynamicTag(
                            player,
                            "美术天赋:",  // 注意有冒号
                            1,           // 增加值
                            "{user}的美术天赋提升了。" // 结果文本
                        );
                    }
                },
                {
                    text: "讲故事",
                    result: "{user}喜欢给大家讲自己编的故事，很有文学素养。",
                    effects: { intelligence: 1 },
                    add_tags: ["文学"]
                },
                {
                    text: "折纸",
                    result: "{user}喜欢教大家折各种小玩意，手工技能不错。",
                    effects: {},
                    add_tags: ["手工"]
                },
                {
                    text: "跳舞",
                    result: "{user}喜欢带领大家跳舞，身体协调性很好。",
                    effects: {},
                    add_tags: ["身体协调"]
                },
                {
                    text: "魔术",
                    result: "{user}喜欢表演一些简单的小魔术逗大家开心，表演天赋初显。",
                    effects: { social: 1 },
                    add_tags: ["表演天赋"]
                },
                {
                    text: "做游戏",
                    result: "{user}喜欢组织大家一起做游戏，展现出领导力。",
                    effects: { social: 2 },
                    add_tags: ["领导力"]
                }
            ]
        },

        "toddler_exploration_behavior_main": {
            title: "探索行为",
            description: "{user}对世界充满了好奇，总是在不停地探索。",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "喜欢拆东西",
                    result: "{user}对各种物件的内部结构非常好奇，总想拆开看看。",
                    effects: {},
                    continue_event: "toddler_dismantling_preference"
                },
                {
                    text: "经常问'为什么'",
                    result: "{user}是个行走的'十万个为什么'，对一切都充满好奇。",
                    effects: { intelligence: 3 },
                    add_tags: ["好奇心"]
                },
                {
                    text: "喜欢收集东西",
                    result: "{user}喜欢收集各种小玩意，石头、瓶盖、卡片等等，有收藏癖。",
                    effects: {},
                    add_tags: ["收藏癖"]
                },
                {
                    text: "总是爬高上低",
                    result: "{user}精力旺盛，喜欢爬高上低，是个小冒险家。",
                    effects: { health: 2 },
                    add_tags: ["冒险家"]
                },
                {
                    text: "喜欢观察昆虫",
                    result: "{user}对小昆虫非常着迷，经常趴在地上观察它们，有生物学家的潜质。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "经常迷路",
                    result: "{user}方向感不太好，就算在家附近也容易迷路。",
                    effects: {},
                    add_tags: ["方向感差"]
                },
                {
                    text: "喜欢挖土",
                    result: "{user}特别喜欢在泥土里挖来挖去，梦想成为考古学家。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "会自制小发明",
                    result: "{user}喜欢用废旧物品制作一些小发明，创造力十足。",
                    effects: { intelligence: 2 },
                    add_tags: ["创造力"]
                },
                {
                    text: "喜欢看星星",
                    result: "{user}对夜空中的星星非常着迷，进行了天文启蒙。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "经常捡垃圾回家",
                    result: "{user}喜欢把路边'有用'的垃圾捡回家，环保意识超前。",
                    effects: {},
                    add_tags: ["环保"]
                }
            ]
        },

        "toddler_dismantling_preference": {
            title: "最喜欢拆什么？",
            description: "{user}最喜欢拆解什么东西呢？",
            trigger_conditions: { age_range: [1, 3] },
            options: [
                {
                    text: "闹钟",
                    result: "{user}对闹钟的齿轮和指针非常着迷，拆解中对时间概念有了初步认识。",
                    effects: { intelligence: 1 },
                    add_tags: ["时间概念"]
                },
                {
                    text: "收音机",
                    result: "{user}把收音机大卸八块，对里面的电路板产生了兴趣，有成为电子工程师的潜质。",
                    effects: { intelligence: 1 },
                    add_tags: ["电子工程师潜质"]
                },
                {
                    text: "玩具车",
                    result: "{user}喜欢拆解玩具车，研究它们的轮子和马达，展现出机械天赋。",
                    effects: {},
                    add_tags: ["机械天赋"]
                },
                {
                    text: "遥控器",
                    result: "{user}对遥控器的按钮和红外线发射器非常好奇，培养了逆向思维。",
                    effects: { intelligence: 1 },
                    add_tags: ["逆向思维"]
                },
                {
                    text: "电话",
                    result: "{user}把家里的旧电话拆了，对听筒和话筒的原理产生了兴趣，有成为通讯专家的潜质。",
                    effects: {},
                    add_tags: ["通讯专家潜质"]
                },
                {
                    text: "计算器",
                    result: "{user}对计算器的液晶屏和按键着迷，是个小小的数码达人。",
                    effects: {},
                    add_tags: ["数码"]
                },
                {
                    text: "手电筒",
                    result: "{user}拆解手电筒，对电池、灯泡和开关有了初步认识，进行了物理启蒙。",
                    effects: {},
                    add_tags: ["物理启蒙"]
                }
            ]
        },

        "toddler_learning_attitude_main": {
            title: "学习态度",
            description: "{user}在早期学习中表现出一些特别的态度。",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "会自己查字典（图画版）",
                    result: "{user}遇到不认识的字，会自己翻看图画字典，自学能力强。",
                    effects: { intelligence: 2 },
                    dynamic_result: function (player) {
                        let currentScore = 0;
                        const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) {
                            currentScore = parseInt(existingScoreTag.split(":")[1]);
                        }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return {
                            result: "{user}遇到不认识的字，会自己翻看图画字典，学习成绩提升了。",
                            effects: { intelligence: 2 },
                            add_tags: newTags,
                            remove_tags: existingScoreTag ? [existingScoreTag] : []
                        };
                    }
                },
                {
                    text: "喜欢背诵古诗",
                    result: "{user}喜欢背诵一些简单的古诗儿歌，文化底蕴从小培养。",
                    effects: { intelligence: 1 },
                    add_tags: ["文化底蕴"]
                },
                {
                    text: "经常分心",
                    result: "{user}学习时注意力不太集中，容易被其他事物吸引。",
                    effects: {},
                    add_tags: []
                },
                {
                    text: "喜欢做笔记涂鸦",
                    result: "{user}喜欢用涂鸦的方式做'笔记'，有自己独特的学习方法。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0;
                        const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) {
                            currentScore = parseInt(existingScoreTag.split(":")[1]);
                        }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return {
                            result: "{user}喜欢用涂鸦的方式做'笔记'，学习成绩提升了。",
                            effects: {},
                            add_tags: newTags,
                            remove_tags: existingScoreTag ? [existingScoreTag] : []
                        };
                    }
                }
            ]
        },

        "toddler_sports_talent_main": {
            title: "运动天赋",
            description: "{user}在运动方面展现出一些天赋或特点。",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "总是跑得很快",
                    result: "{user}跑起来像一阵风，运动细胞发达。",
                    effects: { health: 3 },
                    add_tags: ["运动细胞"]
                },
                {
                    text: "喜欢爬树",
                    result: "{user}三两下就能爬上高高的树，充满了野性。",
                    effects: { health: 2 },
                    add_tags: ["野性"]
                },
                {
                    text: "经常摔跤",
                    result: "{user}走路摇摇晃晃，经常摔跤，平衡感不太好。",
                    effects: { health: -2 },
                    add_tags: ["平衡感差"]
                },
                {
                    text: "喜欢游泳（玩水）",
                    result: "{user}特别喜欢在水里玩耍，有游泳的天赋。",
                    effects: {},
                    continue_event: "toddler_swimming_style"
                },
                {
                    text: "会骑自行车（辅助轮）",
                    result: "{user}很快就学会了骑带辅助轮的自行车，平衡感初显。",
                    effects: {},
                    add_tags: ["平衡大师潜质"]
                },
                {
                    text: "喜欢踢毽子（玩具版）",
                    result: "{user}喜欢踢玩具毽子，并能保持一段时间不落地，专注力不错。",
                    effects: {},
                    add_tags: ["专注力"]
                },
                {
                    text: "经常做体操（模仿）",
                    result: "{user}喜欢模仿电视里的体操动作，柔韧性很好。",
                    effects: {},
                    add_tags: ["柔韧性"]
                },
                {
                    text: "喜欢投篮（玩具篮筐）",
                    result: "{user}喜欢把球投进玩具篮筐，准确性不错。",
                    effects: {},
                    add_tags: ["准确性"]
                },
                {
                    text: "会玩滑板（车）",
                    result: "{user}在滑板车上如鱼得水，有极限运动的天赋。",
                    effects: {},
                    add_tags: ["极限运动潜质"]
                },
                {
                    text: "喜欢跳绳（跳着玩）",
                    result: "{user}喜欢拿着绳子跳来跳去，节奏感很好。",
                    effects: {},
                    add_tags: ["节奏感"]
                }
            ]
        },

        "toddler_swimming_style": {
            title: "游泳风格",
            description: "{user}在水里玩耍时，展现出独特的'游泳'风格：",
            trigger_conditions: { age_range: [5, 5] },
            options: [
                {
                    text: "自由泳（瞎扑腾）",
                    result: "{user}在水里自由自在地扑腾，是个自由派。",
                    effects: { health: 1 },
                    add_tags: ["自由派"]
                },
                {
                    text: "仰泳（躺平）",
                    result: "{user}喜欢在水上躺平漂浮，非常乐观。",
                    effects: {},
                    add_tags: ["乐观派"]
                },
                {
                    text: "蛙泳（狗刨式）",
                    result: "{user}模仿小狗在水里刨动，稳重又实用。",
                    effects: { health: 1 },
                    add_tags: ["稳重派", "实用主义"]
                },
                {
                    text: "蝴蝶泳（瞎折腾）",
                    result: "{user}试图模仿蝴蝶泳的动作，虽然不太标准但追求完美。",
                    effects: {},
                    add_tags: ["完美主义"]
                },
                {
                    text: "狗刨式",
                    result: "{user}无师自通学会了狗刨式，非常实用。",
                    effects: { health: 2 },
                    add_tags: ["实用主义"]
                },
                {
                    text: "漂浮不动",
                    result: "{user}喜欢静静地漂在水上，佛系游泳。",
                    effects: {},
                    add_tags: ["佛系"]
                },
                {
                    text: "潜水（憋气）",
                    result: "{user}喜欢把头埋进水里憋气，勇于探险。",
                    effects: {},
                    add_tags: ["探险家"]
                }
            ]
        }
    },
    // 童年事件 (6-12岁)
    child: {
        "school_field_trip": {
            title: "学校郊游",
            description: "{user}的班级组织了一次郊游活动。",
            trigger_conditions: {
                age_range: [6, 12],
                required_tags: ["小学生"]
            },
            options: [
                {
                    text: "积极参与",
                    result: "{user}在郊游中表现活跃，结交了新朋友。",
                    effects: { social: 10, health: 5 },
                    add_tags: ["社交达人"]
                },
                {
                    text: "独自探索",
                    result: "{user}选择独自探索，发现了一些有趣的东西。",
                    effects: { intelligence: 5, luck: 5 },
                    add_tags: ["探险家"]
                },
                {
                    text: "帮助老师",
                    result: "{user}主动帮助老师管理队伍，展现了责任心。",
                    effects: { social: 5, intelligence: 3 },
                    add_tags: ["责任心"]
                }
            ]
        },

        "science_fair": {
            title: "科学展览会",
            description: "学校举办了一年一度的科学展览会。",
            trigger_conditions: {
                age_range: [8, 12],
                required_tags: ["小学生"]
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

        "sports_day": {
            title: "运动会",
            description: "学校举办了一年一度的运动会。",
            trigger_conditions: {
                age_range: [6, 12],
                required_tags: ["小学生"]
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

        "art_competition": {
            title: "绘画比赛",
            description: "学校举办了一场绘画比赛。",
            trigger_conditions: {
                age_range: [6, 12],
                required_tags: ["小学生"]
            },
            options: [
                {
                    text: "画一幅风景画",
                    result: "{user}画了一幅美丽的风景画，展现了艺术天赋。",
                    effects: { intelligence: 5 },
                    dynamic_result: function (player) {
                        let currentScore = 0;
                        const scoreTagPrefix = "美术成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) {
                            currentScore = parseInt(existingScoreTag.split(":")[1]);
                        }
                        newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                        return {
                            result: "{user}画了一幅美丽的风景画，美术成绩提升了。",
                            effects: { intelligence: 5 },
                            add_tags: newTags,
                            remove_tags: existingScoreTag ? [existingScoreTag] : []
                        };
                    }
                },
                {
                    text: "画一幅人物画",
                    result: "{user}画了一幅生动的人物画，展现了观察力。",
                    effects: { intelligence: 4 },
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

        "music_recital": {
            title: "音乐演奏会",
            description: "学校举办了一场音乐演奏会。",
            trigger_conditions: {
                age_range: [6, 12],
                required_tags: ["小学生"]
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

        "childhood_foreign_teacher_greeting": {
            title: "外教询问",
            description: "外教课上，老师向{user}打招呼：'How are you?'，{user}回答：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                {
                    text: "Hi, Bro!",
                    result: "{user}的回答很新潮，外教笑了。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答很新潮，外教笑了，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
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
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore - 3}`);
                        return { result: "{user}的回答非常中式，外教努力理解中，学习成绩下降了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
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
                        return eventManager.updateDynamicTag(
                            player,
                            "学习成绩:",
                            1,
                            "{user}的回答让外教心花怒放，学习成绩提升了。"
                        );
                    }
                },
                {
                    text: "I am fine, thank you. And you?",
                    result: "{user}的回答标准而有礼貌。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答标准而有礼貌，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                }
            ]
        },
        "childhood_math_apple_cooking": {
            title: "数学课：煮苹果",
            description: "数学老师提问：煮一个苹果需要3分钟，煮三个苹果需要多少分钟？{user}回答：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                {
                    text: "1+1=3",
                    result: "{user}的答案石破天惊，老师决定给个机会。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的答案石破天惊，老师决定给个机会，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "条件不足，此题无解",
                    result: "{user}的回答非常严谨，但可能有点钻牛角尖。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答非常严谨，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "9分钟",
                    result: "{user}的回答中规中矩。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答中规中矩，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "3分钟",
                    result: "{user}的回答显示了灵活的思维。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答显示了灵活的思维，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                }
            ]
        },
        "childhood_math_apple_count": {
            title: "数学课：数苹果",
            description: "数学老师又问：小明有10个苹果，吃了3个，还剩几个？{user}回答：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                {
                    text: "7个",
                    result: "{user}给出了标准答案。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}给出了标准答案，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "10个，因为吃了还在肚子里",
                    result: "{user}的回答角度清奇，老师哭笑不得。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答角度清奇，老师哭笑不得，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "3个，因为其他的都坏了",
                    result: "{user}的回答充满了想象力，但偏离了题目。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答充满了想象力，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "苹果会自己繁殖",
                    result: "{user}的回答让老师开始怀疑人生。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "学习成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                        return { result: "{user}的回答让老师开始怀疑人生，学习成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                }
            ]
        },
        "childhood_english_fill_blank": {
            title: "英语课：填空",
            description: "英语老师出题：Please fill in the blank: 'I _____ an apple yesterday.' {user}填写的答案是：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                { text: "eat", result: "{user}的答案不完全正确，但勇气可嘉。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}的答案不完全正确，但勇气可嘉，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "ate", result: "{user}的答案完全正确！", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}的答案完全正确！学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "eating", result: "{user}的答案时态有些问题。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}的答案时态有些问题，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "am", result: "{user}的答案语法不太对哦。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}的答案语法不太对哦，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "吃了", result: "{user}用中文回答了英文题。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}用中文回答了英文题，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "apple", result: "{user}似乎没理解题目。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}似乎没理解题目，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "yesterday", result: "{user}把题目里的词又填了一遍。", dynamic_result: function (player) { let cs=0; const p="学习成绩:"; const et=player.tags.find(t=>t.startsWith(p)); let nt=player.tags.filter(t=>!t.startsWith(p)); if(et){cs=parseInt(et.split(":")[1]);} nt.push(`${p}${cs+1}`); return {result:"{user}把题目里的词又填了一遍，学习成绩提升了。",effects:{},add_tags:nt,remove_tags:et?[et]:[]};}},
                { text: "我不吃苹果", result: "{user}的回答出人意料，展现了高情商。", effects: {}, add_tags: ["高情商"] }
            ]
        },
        "childhood_pe_running": {
            title: "体育课：跑步",
            description: "体育老师让全班同学跑800米，{user}的选择是：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                {
                    text: "认真跑完全程",
                    result: "{user}坚持跑完了全程，虽然很累但是很有成就感。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "体育成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                        return { result: "{user}坚持跑完了全程，体育成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "偷偷抄近道",
                    result: "{user}选择了捷径，但被老师发现了。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "体育成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore - 1}`);
                        return { result: "{user}选择了捷径，体育成绩下降了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "假装肚子疼",
                    result: "{user}找了个借口逃避跑步。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "体育成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore - 2}`);
                        return { result: "{user}找了个借口逃避跑步，体育成绩下降了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "和同学比赛",
                    result: "{user}和好朋友一起比赛，跑得更起劲了。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "体育成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 3}`);
                        return { result: "{user}和好朋友一起比赛，体育成绩大幅提升。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                }
            ]
        },
        "childhood_art_drawing": {
            title: "美术课：画画",
            description: "美术老师让大家画一幅我的梦想，{user}画的是：",
            trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
            options: [
                {
                    text: "画一个宇航员",
                    result: "{user}画了一个穿着太空服的宇航员，展现了探索宇宙的梦想。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "美术成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                        return { result: "{user}画了一个穿着太空服的宇航员，美术成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "画一个超级英雄",
                    result: "{user}画了一个拯救世界的超级英雄，充满了正义感。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "美术成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                        return { result: "{user}画了一个拯救世界的超级英雄，美术成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                    }
                },
                {
                    text: "画一个科学家",
                    result: "{user}画了一个在实验室做实验的科学家，展现了探索科学的梦想。",
                    effects: {},
                    dynamic_result: function (player) {
                        let currentScore = 0; const scoreTagPrefix = "美术成绩:";
                        const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                        let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                        if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                        newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}画了一个在实验室做实验的科学家，美术成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "画一个老师",
                        result: "{user}画了一个站在讲台上的老师，展现了教书育人的梦想。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "美术成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}画了一个站在讲台上的老师，美术成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "画一个蛋糕",
                        result: "{user}画了一个巨大的蛋糕，看来是个吃货。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "美术成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                            return { result: "{user}画了一个巨大的蛋糕，美术成绩略有提升。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    }
                ]
            },
            "childhood_music_singing": {
                title: "音乐课：唱歌",
                description: "音乐老师让同学们轮流唱歌，轮到{user}了：",
                trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
                options: [
                    {
                        text: "唱《小星星》",
                        result: "{user}唱了一首《小星星》，声音清脆悦耳。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "音乐成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}唱了一首《小星星》，音乐成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "唱《两只老虎》",
                        result: "{user}唱了一首《两只老虎》，全班同学都跟着一起唱。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "音乐成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 3}`);
                            return { result: "{user}唱了一首《两只老虎》，带动了全班气氛，音乐成绩大幅提升。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "假装嗓子疼",
                        result: "{user}找了个借口逃避唱歌。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "音乐成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore - 1}`);
                            return { result: "{user}找了个借口逃避唱歌，音乐成绩下降了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "唱一首自创歌曲",
                        result: "{user}唱了一首自己编的歌，虽然跑调但很有创意。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "音乐成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 1}`);
                            return { result: "{user}唱了一首自己编的歌，音乐成绩略有提升。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    }
                ]
            },
            "childhood_science_experiment": {
                title: "自然课：实验",
                description: "自然课上，老师让大家做一个小实验，{user}的选择是：",
                trigger_conditions: { age_range: [6, 13], required_tags: ["小学生"] },
                options: [
                    {
                        text: "做水变色的实验",
                        result: "{user}用食用色素让水变色，实验很成功。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "自然成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}做水变色的实验很成功，自然成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "做气球吹大的实验",
                        result: "{user}用醋和小苏打让气球变大，实验很有趣。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "自然成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}做气球吹大的实验很有趣，自然成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "做磁铁实验",
                        result: "{user}用磁铁吸引各种物品，发现了磁性的奥秘。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "自然成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 3}`);
                            return { result: "{user}做磁铁实验发现了磁性的奥秘，自然成绩大幅提升。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "做植物生长实验",
                        result: "{user}种了一颗豆子，观察它的生长过程。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "自然成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore + 2}`);
                            return { result: "{user}做植物生长实验很认真，自然成绩提升了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    },
                    {
                        text: "偷偷玩手机",
                        result: "{user}没有认真做实验，而是偷偷玩起了手机。",
                        effects: {},
                        dynamic_result: function (player) {
                            let currentScore = 0; const scoreTagPrefix = "自然成绩:";
                            const existingScoreTag = player.tags.find(tag => tag.startsWith(scoreTagPrefix));
                            let newTags = player.tags.filter(tag => !tag.startsWith(scoreTagPrefix));
                            if (existingScoreTag) { currentScore = parseInt(existingScoreTag.split(":")[1]); }
                            newTags.push(`${scoreTagPrefix}${currentScore - 2}`);
                            return { result: "{user}没有认真做实验，自然成绩下降了。", effects: {}, add_tags: newTags, remove_tags: existingScoreTag ? [existingScoreTag] : [] };
                        }
                    }
                ]
            }
        },
        
        // 青少年事件 (13-18岁)
        teenager: {
            "heroic_rescue_teen": {
                title: "危急时刻",
                description: "{user}看到一个小孩即将被失控的汽车撞到！",
                trigger_conditions: {
                    age_range: [16, 18],
                    excluded_tags: ["残疾"]
                },
                options: [
                    {
                        text: "冲上去救人",
                        conditional_results: [
                            {
                                conditions: {
                                    any_of: [
                                        { tags: ["运动健将"] },
                                        { attributes: { health: 85 } }
                                    ]
                                },
                                result: "{user}以惊人的速度冲了上去，成功将孩子推开！",
                                effects: { social: 30, health: -10, luck: 20 },
                                add_tags: ["少年英雄", "见义勇为"],
                                continue_event: "teen_hero_reward"
                            },
                            {
                                conditions: { default: true },
                                result: "{user}奋不顾身地扑了上去，虽然自己受了伤，但成功救下了孩子。",
                                effects: { social: 20, health: -30 },
                                add_tags: ["见义勇为"],
                                risk: 0.1
                            }
                        ]
                    },
                    {
                        text: "大声呼喊警告",
                        result: "{user}大声呼喊，但为时已晚...",
                        effects: { social: -10, health: -5 }
                    }
                ]
            },
            "school_bully": {
                title: "校园霸凌",
                description: "有同学在欺负一个比较内向的同学，{user}看到了这一幕。",
                trigger_conditions: { age_range: [13, 18], excluded_tags: ["恶霸"] },
                options: [
                    {
                        text: "挺身而出",
                        result: "{user}勇敢地站出来制止了霸凌行为，赢得了大家的尊重。",
                        effects: { social: 20, health: -8, intelligence: 5 },
                        add_tags: ["正义感", "勇敢", "英雄"],
                        remove_tags: ["胆小鬼"]
                    },
                    {
                        text: "告诉老师",
                        result: "{user}选择告诉老师，老师及时制止了霸凌。",
                        effects: { social: -5, intelligence: 8 }
                    },
                    {
                        text: "默默离开",
                        result: "{user}选择默默离开现场。",
                        effects: { health: -3, luck: -5 },
                        remove_tags: ["勇敢"]
                    }
                ]
            },
            "first_love": {
                title: "初恋",
                description: "{user}喜欢上了班里的一个同学。",
                trigger_conditions: { age_range: [14, 18] },
                options: [
                    {
                        text: "勇敢表白",
                        result: "{user}鼓起勇气向对方表白了。",
                        effects: { social: 10, health: 5 },
                        add_tags: ["勇敢"],
                        dynamic_result: function(player) {
                            if (player.luck > 70) {
                                return {
                                    result: "对方接受了{user}的表白！青涩的爱情开始了。",
                                    effects: { social: 20, luck: 10 }
                                };
                            } else {
                                return {
                                    result: "虽然被拒绝了，但{user}的勇气值得赞赏。",
                                    effects: { social: 5, health: -5 }
                                };
                            }
                        }
                    },
                    {
                        text: "默默暗恋",
                        result: "{user}选择把这份感情藏在心里。",
                        effects: { intelligence: 5, health: -3 }
                    }
                ]
            },
            "academic_competition": {
                title: "学科竞赛",
                description: "学校推荐{user}参加省级学科竞赛。",
                trigger_conditions: { age_range: [14, 18], required_tags: ["学霸"], min_attributes: { intelligence: 80 } },
                options: [
                    {
                        text: "全力以赴",
                        result: "{user}努力准备，在竞赛中取得了优异成绩。",
                        effects: { intelligence: 15, social: 10, health: -10 },
                        add_tags: ["竞赛获奖者", "学术新星"]
                    },
                    {
                        text: "随便应付",
                        result: "{user}没有认真准备，成绩平平。",
                        effects: { intelligence: -5 },
                        remove_tags: ["学霸"]
                    }
                ]
            }
        },
        
        // 成年早期 (19-30岁)
        adult: {
            "wrong_number_president": {
                title: "打错电话",
                description: "{user}有一次打错电话，打给了美国总统。",
                trigger_conditions: {
                    age_range: [20, 25]
                },
                options: [
                    {
                        text: "立马挂电话",
                        result: "{user}慌忙挂断了电话，心跳加速。",
                        effects: { social: -5 }
                    },
                    {
                        text: "向总统问好",
                        result: "{user}礼貌地向总统问好，对方也友好回应。",
                        effects: { social: 10, intelligence: 5 }
                    },
                    {
                        text: "问总统吃了没",
                        result: "{user}关心地问总统吃饭了没，把总统逗笑了。",
                        effects: { social: 15, luck: 5 },
                        add_tags: ["幽默"]
                    },
                    {
                        text: "约出来吃宵夜",
                        result: "{user}大胆地约总统吃宵夜，对方婉拒但称赞了{user}的勇气。",
                        effects: { social: 8, luck: 8 },
                        add_tags: ["胆大"]
                    },
                    {
                        text: "反映社会问题",
                        result: "{user}认真地向总统反映了一些社会问题，得到了重视。",
                        effects: { intelligence: 15, social: 10 },
                        add_tags: ["社会责任感"]
                    },
                    {
                        text: "装成中国移动推销",
                        result: "{user}装成客服推销套餐，把总统都整懵了。",
                        effects: { social: 5, luck: 10 },
                        add_tags: ["恶作剧大师"]
                    },
                    {
                        text: "求个国家职位",
                        result: "{user}打错了电话，打给了美国总统。{user}将计就计，竟然向总统说：'给我个国家的职务做做吧。'",
                        effects: { luck: 20 },
                        continue_event: "president_job_offer"
                    }
                ]
            },

            "president_job_offer": {
                title: "总统的回应",
                description: "电话里沉默了一下，接着有翻书的声音。没过多久，电话里头的总统说：'好的，铲屎官的职位现在空缺，{user}，你就做吧。'",
                trigger_conditions: {
                    age_range: [20, 25]
                },
                options: [
                    {
                        text: "接受任命",
                        result: "美国总统赋予{user}所谓'铲屎官'职位。",
                        effects: { social: 20, luck: 15 },
                        add_tags: ["阿美丽卡:铲屎官"],
                        continue_event: "mysterious_package"
                    }
                ]
            },

            "mysterious_package": {
                title: "神秘包裹",
                description: "没多久，{user}收到一副墨镜，和一条铁棒状的仪器，这个仪器有一个按钮，按下这个按钮后，会发出闪光。任何人看到这个闪光，都会忘记30分钟前发生的所有事情。",
                trigger_conditions: {
                    age_range: [20, 25]
                },
                options: [
                    {
                        text: "收下装备",
                        result: "{user}成为了最年轻的特工！",
                        effects: { intelligence: 20, social: 15, luck: 20 },
                        add_tags: ["黑衣人", "特工"]
                    }
                ]
            },
            "heroic_rescue_adult": {
                title: "英雄时刻",
                description: "大楼着火了，{user}听到里面有人呼救！",
                trigger_conditions: {
                    age_range: [19, 50],
                    excluded_tags: ["残疾", "胆小鬼"]
                },
                options: [
                    {
                        text: "冲进火场救人",
                        conditional_results: [
                            {
                                conditions: {
                                    any_of: [
                                        { tags: ["英雄", "消防员"] },
                                        {
                                            attributes: { health: 80, intelligence: 70 },
                                            all_required: true
                                        }
                                    ]
                                },
                                result: "{user}成功救出了被困人员，成为了真正的英雄！",
                                effects: { social: 40, health: -20, luck: 30 },
                                add_tags: ["英雄", "救火英雄"],
                                continue_event: "hero_ceremony"
                            },
                            {
                                conditions: {
                                    tags: ["警察"]
                                },
                                result: "{user}专业地组织撤离，最大程度减少了伤亡。",
                                effects: { social: 30, intelligence: 10 },
                                add_tags: ["专业救援"]
                            },
                            {
                                conditions: { default: true },
                                result: "{user}勇敢地冲了进去，但被浓烟呛得不轻...",
                                effects: { health: -40, social: 15 },
                                risk: 0.3
                            }
                        ]
                    },
                    {
                        text: "呼叫消防队",
                        result: "{user}及时呼叫了消防队，协助疏散人群。",
                        effects: { social: 10, intelligence: 5 }
                    }
                ]
            },

            "complex_investment": {
                title: "复杂投资决策",
                description: "一个高风险高回报的投资机会出现了。",
                trigger_conditions: {
                    age_range: [25, 60],
                    min_attributes: { money: 80 }
                },
                options: [
                    {
                        text: "全部投入",
                        conditional_results: [
                            {
                                conditions: {
                                    tags: ["企业家", "投资高手"],
                                    attributes: { intelligence: 85, luck: 70 },
                                    all_required: true
                                },
                                result: "{user}的判断完全正确，投资获得了巨大成功！",
                                effects: { money: 200, intelligence: 15 },
                                add_tags: ["投资大亨"],
                                continue_event: "business_empire"
                            },
                            {
                                conditions: {
                                    any_of: [
                                        { tags: ["富二代"] },
                                        { attributes: { luck: 90 } }
                                    ]
                                },
                                result: "凭借运气或资源，{user}的投资获得了不错的回报。",
                                effects: { money: 80, social: 10 }
                            },
                            {
                                conditions: {
                                    not: { tags: ["投资失败", "破产"] },
                                    attributes: { intelligence: 70 }
                                },
                                result: "{user}的投资有一定收益，但没有预期那么好。",
                                effects: { money: 30 }
                            },
                            {
                                conditions: { default: true },
                                result: "投资失败了，{user}损失惨重...",
                                effects: { money: -60, health: -15 },
                                add_tags: ["投资失败"]
                            }
                        ]
                    },
                    {
                        text: "谨慎观望",
                        result: "{user}选择了观望，错过了机会。",
                        effects: { intelligence: 5 }
                    }
                ]
            },
            "job_interview": {
                title: "重要面试",
                description: "{user}来到一家心仪公司参加面试。",
                trigger_conditions: { age_range: [22, 30], excluded_tags: ["无业游民"] },
                options: [
                    {
                        text: "展现真实的自己",
                        result: "{user}诚实地展现了自己的能力和不足。",
                        effects: { social: 10, intelligence: 5 },
                        add_tags: ["诚实"],
                        dynamic_result: function(player) {
                            if (player.luck > 60) {
                                return {
                                    result: "面试官对{user}的坦诚印象深刻，{user}获得了这份工作！",
                                    effects: { money: 30, social: 10 }
                                };
                            } else {
                                return {
                                    result: "虽然面试官欣赏{user}的诚实，但最终选择了其他候选人。",
                                    effects: { social: 5 }
                                };
                            }
                        }
                    },
                    {
                        text: "夸大自己的能力",
                        result: "{user}夸大了自己的经验和能力。虽然暂时蒙混过关，但内心有些不安。",
                        effects: { money: 15, luck: -5 },
                        remove_tags: ["诚实"],
                        risk: 0.3
                    }
                ]
            },
            "marriage_proposal": {
                title: "求婚",
                description: "{user}和恋人已经相处多年，是时候做出决定了。",
                trigger_conditions: { age_range: [25, 40], excluded_tags: ["已婚"] },
                options: [
                    {
                        text: "浪漫求婚",
                        result: "{user}精心准备了一场浪漫的求婚。",
                        effects: { money: -20, social: 20, luck: 10 },
                        dynamic_result: function(player) {
                            if (player.social > 60 && player.luck > 50) {
                                return {
                                    result: "对方感动地答应了！{user}即将步入婚姻殿堂。",
                                    effects: { social: 30, health: 10 },
                                    add_tags: ["已婚"]
                                };
                            } else {
                                return {
                                    result: "虽然求婚失败了，但这段经历让{user}成长了。",
                                    effects: { social: -10, intelligence: 10 }
                                };
                            }
                        }
                    },
                    {
                        text: "再等等看",
                        result: "{user}决定再等等，继续维持现状。",
                        effects: { money: 5, social: -5 }
                    }
                ]
            },
            "have_children": {
                title: "生育选择",
                description: "{user}和伴侣讨论是否要孩子。",
                trigger_conditions: { age_range: [26, 45], required_tags: ["已婚"], excluded_tags: ["为人父母"] },
                options: [
                    {
                        text: "准备要孩子",
                        result: "经过精心准备，{user}迎来了新生命！",
                        effects: { money: -30, health: -10, social: 20 },
                        add_tags: ["为人父母"],
                        continue_event: "parenting_start"
                    },
                    {
                        text: "暂时不要",
                        result: "{user}决定先专注于事业发展。",
                        effects: { money: 20, health: 5 }
                    }
                ]
            },
            "parenting_start": {
                title: "初为人父母",
                description: "孩子的到来让{user}的生活发生了巨大改变。",
                trigger_conditions: { age_range: [26, 50] },
                options: [
                    {
                        text: "全心投入育儿",
                        result: "{user}把大部分精力都投入到了孩子身上。",
                        effects: { social: 15, money: -20, health: -15 },
                        add_tags: ["好父母"]
                    },
                    {
                        text: "平衡工作和家庭",
                        result: "{user}努力在工作和家庭之间找到平衡。",
                        effects: { money: -10, health: -10, intelligence: 10 }
                    }
                ]
            },
            "startup_opportunity": {
                title: "创业机会",
                description: "朋友邀请{user}一起创业。",
                trigger_conditions: { age_range: [25, 45], min_attributes: { money: 50 } },
                options: [
                    {
                        text: "全力投入",
                        result: "{user}决定辞职创业，全力以赴。",
                        effects: { money: -40, intelligence: 15 },
                        risk: 0.3,
                        dynamic_result: function(player) {
                            if (player.luck > 70 && player.intelligence > 75) {
                                return {
                                    result: "创业大获成功！{user}成为了一名成功的企业家。",
                                    effects: { money: 100, social: 30 },
                                    add_tags: ["企业家"]
                                };
                            } else {
                                return {
                                    result: "创业虽然失败了，但{user}学到了宝贵的经验。",
                                    effects: { intelligence: 20, social: 10 }
                                };
                            }
                        }
                    },
                    {
                        text: "保守观望",
                        result: "{user}选择继续现在的工作，观望形势。",
                        effects: { money: 10, health: 5 }
                    }
                ]
            }
        },
        
        // 中年 (31-50岁)
        middleAge: {
            "health_crisis": {
                title: "健康危机",
                description: "{user}在体检中发现了严重的健康问题。",
                trigger_conditions: {
                    age_range: [35, 60],
                    max_attributes: { health: 60 }
                },
                options: [
                    {
                        text: "积极治疗",
                        conditional_results: [
                            {
                                conditions: {
                                    tags: ["医学奇迹"],
                                    attributes: { money: 100 }
                                },
                                result: "奇迹再次降临！最先进的治疗让{user}完全康复了！",
                                effects: { health: 60, money: -80 },
                                add_tags: ["战胜病魔", "生命斗士"]
                            },
                            {
                                conditions: {
                                    any_of: [
                                        { tags: ["坚强意志", "钢铁意志"] },
                                        { attributes: { luck: 85 } }
                                    ]
                                },
                                result: "{user}的坚强意志创造了医学奇迹！",
                                effects: { health: 40, money: -40 },
                                add_tags: ["医学奇迹"]
                            },
                            {
                                conditions: {
                                    attributes: { money: 60 }
                                },
                                result: "经过昂贵的治疗，{user}的病情得到了控制。",
                                effects: { health: 20, money: -50 }
                            },
                            {
                                conditions: { default: true },
                                result: "治疗效果有限，{user}的健康状况依然堪忧。",
                                effects: { health: 10, money: -30 }
                            }
                        ]
                    },
                    {
                        text: "寻求偏方",
                        result: "{user}选择了另类疗法，效果未知...",
                        effects: { money: -2 },
                        risk: 0.4
                    }
                ]
            },
            "charity_event": {
                title: "慈善活动邀请",
                description: "朋友邀请{user}参加一个慈善活动。",
                trigger_conditions: { age_range: [31, 50], min_attributes: { money: 50 } },
                options: [
                    {
                        text: "积极参与",
                        result: "{user}积极参与了慈善活动，帮助了很多需要帮助的人。",
                        effects: { social: 15, money: -10, luck: 20 },
                        add_tags: ["慈善家"]
                    },
                    {
                        text: "捐点钱就行",
                        result: "{user}捐了一些钱但没有亲自参与。",
                        effects: { money: -5, luck: 8 }
                    }
                ]
            },
            "midlife_crisis": {
                title: "中年危机",
                description: "{user}开始对现在的生活产生怀疑。",
                trigger_conditions: { age_range: [40, 50] },
                options: [
                    {
                        text: "寻求改变",
                        result: "{user}决定做出一些改变，追求内心真正想要的生活。",
                        effects: { health: 10, social: 10, money: -15 },
                        add_tags: ["勇于改变"]
                    },
                    {
                        text: "坚持现状",
                        result: "{user}选择接受现实，继续现在的生活。",
                        effects: { money: 10, health: -5 }
                    }
                ]
            },
            "research_breakthrough": {
                title: "科研突破",
                description: "{user}在研究中发现了重要的线索。",
                trigger_conditions: { age_range: [30, 55], required_tags: ["学术新星"], min_attributes: { intelligence: 85 } },
                options: [
                    {
                        text: "深入研究",
                        result: "{user}废寝忘食地深入研究，取得了重大突破！",
                        effects: { intelligence: 20, health: -15, social: -10 },
                        add_tags: ["科学家"]
                    },
                    {
                        text: "分享成果",
                        result: "{user}选择与团队分享发现，共同推进研究。",
                        effects: { social: 20, intelligence: 10 }
                    }
                ]
            }
        },
        
        // 老年 (51岁以上)
        elderly: {
            "grandchild_visit": {
                title: "孙辈来访",
                description: "{user}的孙子孙女来看望{user}。",
                trigger_conditions: { age_range: [51, 100], required_tags: ["为人父母"] },
                options: [
                    {
                        text: "给他们讲故事",
                        result: "{user}给孙辈讲了很多有趣的人生故事。",
                        effects: { social: 10, health: 5 },
                        add_tags: ["慈祥的长辈"]
                    },
                    {
                        text: "给他们零花钱",
                        result: "{user}给了孙辈很多零花钱。",
                        effects: { money: -15, social: 5 }
                    }
                ]
            },
            "retirement_choice": {
                title: "退休生活",
                description: "{user}到了退休的年龄。",
                trigger_conditions: { age_range: [60, 70], excluded_tags: ["已退休"] },
                options: [
                    {
                        text: "环游世界",
                        result: "{user}决定用积蓄去环游世界，完成年轻时的梦想。",
                        effects: { money: -30, health: 10, social: 15 },
                        add_tags: ["已退休", "环球旅行者"]
                    },
                    {
                        text: "颐养天年",
                        result: "{user}选择在家安享晚年，与家人共度时光。",
                        effects: { health: 15, social: 10 },
                        add_tags: ["已退休"]
                    }
                ]
            },
            "legacy_decision": {
                title: "人生遗产",
                description: "{user}开始思考要给后人留下什么。",
                trigger_conditions: { age_range: [70, 100] },
                options: [
                    {
                        text: "写回忆录",
                        result: "{user}开始撰写回忆录，记录自己的人生经历。",
                        effects: { intelligence: 10, social: 15 },
                        add_tags: ["作家"]
                    },
                    {
                        text: "设立基金",
                        result: "{user}决定设立慈善基金，帮助更多的人。",
                        effects: { money: -50, social: 30, luck: 20 },
                        add_tags: ["大慈善家"]
                    }
                ]
            }
        }
    }
;

// 暴露到全局
window.ageEvents = ageEvents;
