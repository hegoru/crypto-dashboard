<template>
  <header class="py-4 bg-slate-900 text-slate-400">
    <div class="container mx-auto">
      <nav>
        <ul class="flex">
          <li class="mr-5 font-bold">
            <router-link to="/">Coins</router-link>
          </li>
          <li class="font-bold">
            <router-link to="/fng">Fear & Greed index</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main role="main">
    <router-view class="mt-5" />
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>
