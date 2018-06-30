const TYPES = {
    EXPANSION: 'expansion',
    ADVENTURE: 'adventure',
    CORE: 'core'
}

export default {
    HERO_SKINS: {
        name: 'Hero Skins',
        number: 0,
        type: TYPES.CORE
    },
    EXPERT1: {
        name: 'Classic',
        number: 0,
        type: TYPES.CORE
    },
    HOF: {
        name: 'Hall of Fame',
        number: 0,
        type: TYPES.CORE
    },
    CORE: {
        name: 'Core',
        number: 1,
        type: TYPES.CORE
    },
    NAXX: {
        name: 'Curse of Naxxramas',
        number: 2,
        type: TYPES.ADVENTURE,
        icon: 'spider'
    },
    GVG: {
        name: 'Goblins vs Gnomes',
        number: 3,
        type: TYPES.EXPANSION,
        icon: 'goblin'
    },
    BRM: {
        name: 'Blackrock Mountain',
        number: 4,
        type: TYPES.ADVENTURE,
        icon: 'mountain'
    },
    TGT: {
        name: 'The Grand Tournament',
        number: 5,
        type: TYPES.EXPANSION,
        icon: 'shield-crown'
    },
    LOE: {
        name: 'League of Explorers',
        number: 6,
        type: TYPES.ADVENTURE,
        icon: 'hat'
    },
    OG: {
        name: 'Whispers of the Old Gods',
        number: 7,
        type: TYPES.EXPANSION,
        icon: 'eye'
    },
    KARA: {
        name: 'One Night in Karazhan',
        number: 8,
        type: TYPES.ADVENTURE,
        icon: 'music'
    },
    GANGS: {
        name: 'Mean Streets of Gadgetzan',
        number: 9,
        type: TYPES.EXPANSION,
        icon: 'brass-knuckles'
    },
    UNGORO: {
        name: 'Journey to Un\'Goro',
        number: 10,
        type: TYPES.EXPANSION,
        icon: 'dino-footprint'
    },
    ICECROWN: {
        name: 'Knights of the Frozen Throne',
        number: 11,
        type: TYPES.EXPANSION,
        icon: 'icecrown'
    },
    LOOTAPALOOZA: {
        name: 'Kobolds & Catacombs',
        number: 12,
        type: TYPES.EXPANSION,
        icon: 'candle'
    },
    GILNEAS: {
        name: 'The Witchwood',
        number: 13,
        type: TYPES.EXPANSION,
        icon: 'spooky-tree'
    }
}
