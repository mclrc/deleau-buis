<template>
  <div id="wrapper">
    <form ref="form" v-if="!messageSent">
      <label for="email">Email</label>
      <input type="email" name="email" required minlength="10" />
      <label for="subject">Betreff</label>
      <input type="text" name="subject" required minlength="10" />
      <label for="message">Nachricht</label>
      <textarea
        name="mesage"
        id=""
        cols="30"
        rows="10"
        minlength="10"
        required
      ></textarea>
      <input
        @click="submit"
        type="button"
        class="btn-primary"
        value="Abschicken"
      />
    </form>
    <p v-else>Nachricht gesendet!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const messageSent = ref(false);
const form = ref<HTMLFormElement | null>(null);

const submit = async (event: Event) => {
  event.preventDefault();
  await fetch("/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new FormData(form.value ?? undefined),
  });
  messageSent.value = true;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";
@import "@/assets/style/globals.scss";

#wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
}

label {
  font-size: 0.8em;
}

textarea {
  resize: none;
}
input[type="text"],
input[type="email"],
textarea {
  color: $text-color;
  font-family: inherit;
  width: 100%;
  padding: 0.7em;
  margin: 0.3rem 0;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  &:active,
  &:focus {
    border-color: transparent;
    outline: 2px solid $accent-color;
  }
}
</style>
