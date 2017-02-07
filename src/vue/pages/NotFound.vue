<template lang="pug">
article.right-align
	h1.hlg Ooops...
	h1.hxxl
		mark 404
	h2 Looks like I can't always give what you want
	router-link(:to="{ name: 'home', exact: true }") Check back the other ones
</template>

<script>
export default {
	name: 'NotFound'
}	
</script>
