import HEARTHSTONE_SETS from '@/common/data/sets'

export default {
    filters: {
        setIcon(set) {
            if (!set) return ''
            return HEARTHSTONE_SETS[set].icon
        },
        setName(set) {
            if (!set) return ''
            return HEARTHSTONE_SETS[set].name
        }
    }
}
