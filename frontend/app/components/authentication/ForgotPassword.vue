<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {forgotPassword} from "~/api/auth/auth.api";
import {toast} from "vue-sonner";

const email = ref('')

const handleSubmit = async (): Promise<void> => {
  try {
    const result = await forgotPassword(email.value)

    if (result.exists) {
      toast.success('We sent a message on email to reset password')
    }
  }
  catch (error) {
    console.error(error)
    toast.error('Something went wrong')
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
            Forgot password
          </h1>

          <p class="max-w-85 text-sm leading-5 text-slate-400">
            Enter your email and we will send instructions to reset your password.
          </p>
        </div>
      </div>

      <form
        class="w-full space-y-3 sm:space-y-4"
        @submit.prevent="handleSubmit"
      >
        <FieldGroup class="space-y-5">
          <Field>
            <FieldLabel
              for="email"
              class="text-[13px] font-medium text-slate-800"
            >
              Your email
            </FieldLabel>

            <div class="relative">
              <Input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="natala.brak@kmnsstudio.com"
                class="h-11 w-full rounded-none border-slate-200 px-4 pr-11 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2"
              />

              <Mail class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
            </div>

            <FieldDescription class="text-xs leading-4 text-slate-400">
              Use the email address connected to your workspace.
            </FieldDescription>
          </Field>
        </FieldGroup>

        <Button
          type="submit"
          :disabled="!email"
          class="h-12 w-full rounded-md bg-[#050816] text-sm font-medium text-white shadow-[0_18px_30px_rgba(5,8,22,0.28)] hover:bg-[#0b1022]"
        >
          Send reset link
        </Button>
      </form>

      <div class="w-full space-y-5">
        <div class="flex w-full items-center gap-3 sm:gap-4">
          <Separator class="h-px flex-1 bg-slate-200" />
          <span class="shrink-0 text-center text-xs text-slate-400">
            remembered it?
          </span>
          <Separator class="h-px flex-1 bg-slate-200" />
        </div>

        <NuxtLink
          :to="{ name: 'login' }"
          class="flex items-center justify-center gap-2 text-xs font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
        >
          <ArrowLeft class="size-4" />
          Back to log in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
