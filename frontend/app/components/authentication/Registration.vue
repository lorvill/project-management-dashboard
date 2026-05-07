<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {useAuthMutations} from "~/queries/auth/auth.queries";

const email = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const registerWithGoogle = () => {
  window.location.href = 'http://localhost:5003/auth/google'
}

const { registerMutation } = useAuthMutations()

const onSubmit = () => {
  if (!email.value || !name.value || !password.value || !confirmPassword.value) {
    return
  }

  if (password.value !== confirmPassword.value) {
    return
  }


  registerMutation.mutate(
      {
        email: email.value,
        name: name.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      },
  )
}
</script>

<template>
  <div class="flex h-full min-h-0 w-full items-center justify-center px-3 py-2 sm:px-5 sm:py-3">
    <div class="flex w-full max-w-md flex-col justify-center gap-3 sm:gap-4">
      <div class="space-y-1 sm:space-y-1">
        <div class="mb-0 text-[28px] leading-none text-indigo-900 sm:text-[34px]">*</div>

        <div class="space-y-2">
          <h1 class="text-[26px] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px] lg:text-[34px]">
            Create an account
          </h1>

          <p class="max-w-80 text-[11px] leading-4 text-slate-400 sm:max-w-85 sm:text-xs sm:leading-5">
            Set up your account to organize tasks, notes, and projects in one place.
          </p>
        </div>
      </div>

      <form
          class="w-full space-y-3 sm:space-y-4"
          @submit.prevent="onSubmit"
      >
      <FieldGroup class="w-full space-y-1 sm:space-y-0.5">
        <Field>
          <FieldLabel
              for="full-name"
              class="text-xs font-medium text-slate-800"
          >
            Full name
          </FieldLabel>

          <Input
              id="full-name"
              v-model="name"
              type="text"
              autocomplete="name"
              placeholder="Natala Brak"
              class="h-9 w-full rounded-none border-slate-200 px-3 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2 sm:h-10 sm:px-4"
          />
        </Field>

        <Field>
          <FieldLabel
              for="email"
              class="text-xs font-medium text-slate-800"
          >
            Your email
          </FieldLabel>

          <Input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="natala.brak@kmnsstudio.com"
              class="h-9 w-full rounded-none border-slate-200 px-3 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2 sm:h-10 sm:px-4"
          />
        </Field>

        <Field>
          <FieldLabel
              for="password"
              class="text-xs font-medium text-slate-800"
          >
            Create password
          </FieldLabel>

          <div class="relative">
            <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Create a strong password"
                class="h-9 w-full rounded-none border-slate-200 px-3 pr-10 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2 sm:h-10 sm:px-4 sm:pr-11"
            />

            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                class="absolute right-1.5 top-1/2 size-7 -translate-y-1/2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 sm:right-2 sm:size-8"
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

          <FieldDescription class="text-[11px] leading-4 text-slate-400">
            Use at least 8 characters with a mix of letters and numbers.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel
              for="confirm-password"
              class="text-xs font-medium text-slate-800"
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
                class="h-9 w-full rounded-none border-slate-200 px-3 pr-10 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2 sm:h-10 sm:px-4 sm:pr-11"
            />

            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                class="absolute right-1.5 top-1/2 size-7 -translate-y-1/2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 sm:right-2 sm:size-8"
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
          type="submit"
          class="mt-1 h-10 w-full rounded-md bg-[#050816] text-sm font-medium text-white shadow-[0_14px_24px_rgba(5,8,22,0.24)] hover:bg-[#0b1022] sm:h-11 cursor-pointer"
      >
        Create account
      </Button>
      </form>

      <div class="w-full space-y-3 sm:space-y-4">
        <div class="flex w-full items-center gap-2.5 sm:gap-3">
          <Separator class="h-px flex-1 bg-slate-200" />
          <span class="shrink-0 text-center text-[11px] text-slate-400 sm:text-xs">
            or continue with
          </span>
          <Separator class="h-px flex-1 bg-slate-200" />
        </div>

        <div class="w-full">
          <Button
              @click="registerWithGoogle"
              type="button"
              variant="outline"
              class="mt-1 h-10 w-full rounded-md bg-neutral-100 text-sm font-medium text-white shadow-[0_14px_24px_rgba(5,8,22,0.24)] hover:bg-neutral-200 sm:h-11 cursor-pointer"
          >
            <span class="text-base font-semibold text-black">Google</span>
          </Button>
        </div>

        <p class="text-center text-[11px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
          Already have an account?
          <NuxtLink
              :to="{name: 'login'}"
              class="ml-1 font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
          >
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
