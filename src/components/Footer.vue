<template>
    <footer class="footer bg-dark">
        <div class="container text-center">
            <span class="text-muted">Copyright &copy; 2018 | Built by Cody Barr</span>
        </div>
    </footer>
</template>

<style lang="scss">
// Sticky footer
// #app
// -> .content
// -> footer.footer
#app {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.content {
    flex: 1 0 auto;
}
footer.footer {
    flex-shrink: 0;
    height: 60px;
    line-height: 60px;
}
</style>
