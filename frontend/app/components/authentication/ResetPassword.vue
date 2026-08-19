<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {resetPassword} from "~/api/auth/auth.api";
import {toast} from "vue-sonner";

const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const route = useRoute()
const token = computed(() => route.query.token as string)

const onSubmit = async () => {
  if (!token.value) {
    toast.error('Invalid or expired token')
    return
  }

  try {
    await resetPassword(token.value, newPassword.value)

    toast.success('Password has been reset')
    await navigateTo({ name: 'login' })
  } catch (error) {
    console.error(error)
    toast.error('Try again')
  }
}
</script>

<template>
  <div class="flex h-full min-h-0 items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-105 space-y-6 sm:space-y-7">
      <div class="space-y-4">
        <div class="mb-0 text-4xl leading-none text-indigo-900 sm:text-5xl">*</div>

        <div class="space-y-2">
          <h1 class="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Reset password
          </h1>

          <p class="max-w-85 text-sm leading-5 text-slate-400">
            Choose a new password to keep your tasks, notes, and projects secure.
          </p>
        </div>
      </div>

      <form
        class="w-full space-y-3 sm:space-y-4"
        @submit.prevent="onSubmit"
      >
        <FieldGroup class="space-y-5">
          <Field>
            <FieldLabel
              for="password"
              class="text-[13px] font-medium text-slate-800"
            >
              New password
            </FieldLabel>

            <div class="relative">
              <Input
                id="password"
                v-model="newPassword"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Create a strong password"
                class="h-11 w-full rounded-none border-slate-200 px-4 pr-11 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                class="absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                @click="showPassword = !showPassword"
              >
                <EyeOff
                  v-if="showPassword"
                  class="size-4"
                />
                <Eye
                  v-else
                  class="size-4"
                />
              </Button>
            </div>

            <FieldDescription class="text-xs leading-4 text-slate-400">
              Use at least 8 characters with a mix of letters and numbers.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel
              for="confirm-password"
              class="text-[13px] font-medium text-slate-800"
            >
              Confirm password
            </FieldLabel>

            <div class="relative">
              <Input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Repeat your password"
                class="h-11 w-full rounded-none border-slate-200 px-4 pr-11 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                class="absolute right-2 top-1/2 size-7 -translate-y-1/2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeOff
                  v-if="showConfirmPassword"
                  class="size-4"
                />
                <Eye
                  v-else
                  class="size-4"
                />
              </Button>
            </div>
          </Field>
        </FieldGroup>

        <Button
            :disabled="!newPassword || !confirmPassword"
          type="submit"
          class="h-12 w-full rounded-md bg-[#050816] text-sm font-medium text-white shadow-[0_18px_30px_rgba(5,8,22,0.28)] hover:bg-[#0b1022]"
        >
          Update password
        </Button>
      </form>

      <NuxtLink
        :to="{ name: 'login' }"
        class="flex items-center justify-center gap-2 text-xs font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
      >
        <ArrowLeft class="size-4" />
        Back to log in
      </NuxtLink>
    </div>
  </div>
</template>
