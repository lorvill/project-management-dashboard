<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {redirectToGoogleAuth} from "~/utils/auth/auth.utils";
import {useLoginMutation} from "~/api/auth/mutations/login.mutation";
import { useForm } from 'vee-validate'
import { loginSchema } from "~/api/auth/auth.zod-schema";
import {toTypedSchema} from "@vee-validate/zod";

const showPassword = ref(false)
const authError = ref('')

const loginMutation = useLoginMutation()

const {
  defineField,
  errors,
  handleSubmit,
} = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit(async(values) => {
  authError.value = ''
  try {
    await loginMutation.mutateAsync(values)
  } catch {
    authError.value = 'Incorrect email or password'
  }
})
</script>

<template>
  <div class="flex h-full min-h-0 items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-105 space-y-6 sm:space-y-7">
      <div class="space-y-4">
        <div class="mb-0 text-4xl leading-none text-indigo-900 sm:text-5xl">*</div>

        <div class="space-y-2">
          <h1
              class="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl"
          >
            Log in
          </h1>

          <p class="max-w-85 text-sm leading-5 text-slate-400">
            Welcome back. Log in to access your tasks, notes, and projects from
            anywhere.
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
                for="email"
                class="text-[13px] font-medium text-slate-800"
            >
              Your email
            </FieldLabel>

            <Input
                id="email"
                v-model="email"
                v-bind="emailProps"
                type="email"
                autocomplete="email"
                placeholder="natala.brak@kmnsstudio.com"
                :class="[
                    'h-11 w-full rounded-none px-4 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2',
                     errors.email ? 'border-red-500' : 'border-slate-200']"
            />

            <p v-if="errors.email" class="mt-1 text-sm text-red-500">
              {{ errors.email }}
            </p>
          </Field>

          <Field>
            <div class="flex items-center justify-between gap-3">
              <FieldLabel
                  for="password"
                  class="text-[13px] font-medium text-slate-800"
              >
                Password
              </FieldLabel>

              <NuxtLink :to="{ name: 'forgot-password' }"
                  class="text-xs font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
              >
                Forgot password?
              </NuxtLink>
            </div>

            <div class="relative">
              <Input
                  id="password"
                  v-model="password"
                  v-bind="passwordProps"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="Enter your password"
                  :class="[
                      'h-11 w-full rounded-none px-4 pr-11 text-sm shadow-none placeholder:text-slate-300 focus-visible:ring-2',
                      errors.password ? 'border-red-500' : 'border-slate-200'
  ]"
              />

              <p v-if="errors.password" class="mt-1 text-sm text-red-500">
                {{ errors.password }}
              </p>

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
          </Field>
        </FieldGroup>

        <p
            v-if="authError"
            class="text-sm text-red-500"
        >
          {{ authError }}
        </p>
        
        <Button
            type="submit"
            class="h-12 w-full rounded-md bg-[#050816] text-sm font-medium text-white shadow-[0_18px_30px_rgba(5,8,22,0.28)] hover:bg-[#0b1022]"
        >
          Log in
        </Button>
      </form>

      <div class="w-full space-y-5">
        <div class="flex w-full items-center gap-3 sm:gap-4">
          <Separator class="h-px flex-1 bg-slate-200" />
          <span class="shrink-0 text-center text-xs text-slate-400">
            or continue with
          </span>
          <Separator class="h-px flex-1 bg-slate-200" />
        </div>
        <div class="w-full">
          <Button
              @click="redirectToGoogleAuth"
              type="button"
              variant="outline"
              class="mt-1 h-10 w-full rounded-md bg-neutral-100 text-sm font-medium text-white shadow-[0_14px_24px_rgba(5,8,22,0.24)] hover:bg-neutral-200 sm:h-11 cursor-pointer"
          >
            <span class="text-base font-semibold text-black">Google</span>
          </Button>
        </div>

        <p class="text-center text-xs leading-5 text-slate-400">
          Don’t have an account?
          <NuxtLink
              :to="{name: 'registration'}"
              class="font-medium text-[#f08a5b] transition-colors hover:text-[#e37038]"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
