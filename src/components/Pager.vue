<template>
    <div>
        <p>Displaying results {{ start+1 }}-{{ lastPage ? total : end+1 }} of {{ total }}</p>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <!-- First -->
                <li :class="['page-item', { disabled: firstPage }]">
                    <router-link :to="{query: { page: 1}}"
                        class="page-link" aria-label="First">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">First</span>
                    </router-link>
                </li>
                <!-- Previous -->
                <li :class="['page-item', { disabled: firstPage }]">
                    <router-link :to="{query: { page: page-1}}"
                        class="page-link">Previous</router-link>
                </li>
                <!-- Other Pages -->
                <li v-for="currentPage in pagerRange" :key="currentPage"
                    :class="['page-item', { active: currentPage == page}]">
                    <router-link class="page-link" :to="{query: {page: currentPage}}">
                        {{ currentPage }}
                    </router-link>
                </li>
                <!-- Next -->
                <li :class="['page-item', { disabled: lastPage }]">
                    <router-link :to="{query: { page: page+1}}"
                        class="page-link">Next</router-link>
                </li>
                <!-- Last -->
                <li :class="['page-item', { disabled: lastPage }]">
                    <router-link :to="{query: { page: totalPages }}"
                        class="page-link" aria-label="Last">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Last</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'pager',
    props: ['page', 'perPage', 'total'],
    comments: true,
    data() {
        return {
            limit: 5
        }
    },
    computed: {
        start() {
            return (this.page - 1) * this.perPage
        },
        end() {
            return this.start + this.perPage
        },
        totalPages() {
            return Math.floor(this.total / this.perPage) + 1
        },
        pagerRange() {
            // LOGIC HERE SHOULD PROBABLY BE CLEANED UP...BUT IT SEEMS TO WORK FOR NOW

            // default - show entire range
            let range = _.range(1, this.totalPages+1)

            // if the range is greater than the limit then we need to truncate it
            if (range.length > this.limit) {
                // if the current page is less then the limit, splice the array from the beginning
                if (this.page < this.limit) {
                    range = range.slice(0, this.limit)
                }
                // if the current page is less than the total pages less the limit, splice the array from the end
                else if (this.page > (this.totalPages - this.limit + 1)) {
                    range = range.slice((this.totalPages - this.limit), this.totalPages)
                }
                // otherwise we're in the middle
                else {
                    range = range.slice(this.page - (Math.floor(this.limit / 2) + 1), 
                        this.page + Math.floor(this.limit / 2))
                }
            }

            return range
        },
        firstPage() {
            return this.page === 1
        },
        lastPage() {
            return this.end >= this.total
        }
    }
}
</script>
