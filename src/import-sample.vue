<template>
    <div>
        <samp>import sample component work~</samp>
        <input placeholder="search"/>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="scss" scoped>


    input {
        margin: 1rem 0;
        border: 1px solid gainsboro;
        padding: .5rem 1rem;
        border-radius: 10px;
        min-width: 200px;

        &:focus {
            outline: none;
        }
    }
</style>