import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema_login = z.object({
    email: z.string().min(1, {
        message: "Ingresa tu correo",
    }),
    password: z.string().min(8, {
        message: "La contraseña debe tener minimo 8 caracteres",
    }),
})

const formSchema_register = z.object({
    name: z.string().min(1, {
        message: "Ingresa tu nombre",
    }),
    last_name_1: z.string().min(1, {
        message: "Ingresa tu primer apellido",
    }),
    last_name_2: z.string().min(1, {
        message: "Ingresa tu segundo apellido",
    }),
    email: z.string().min(1, {
        message: "Ingresa tu correo",
    }),
    password: z.string().min(8, {
        message: "La contraseña debe tener minimo 8 caracteres",
    }),
})

export function DonorForm() {
    // 1. Define your form.
    const form_login = useForm  ({
        resolver: zodResolver(formSchema_login),
    })
    
    const form_register = useForm({
        resolver: zodResolver(formSchema_register),
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="login">Inicio de Sesión</TabsTrigger>
                <TabsTrigger className="w-full" value="register">Registro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Form {...form_login}>
                    <form onSubmit={form_login.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <FormField
                            control={form_login.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="correo@test.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form_login.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            onClick={() => {
                                console.log('Login donor')
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </Form>
            </TabsContent>
            <TabsContent value="register">
                <Form {...form_register}>
                    <form onSubmit={form_register.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <FormField
                            control={form_register.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Pedro" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form_register.control}
                            name="last_name_1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primer apellido</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Perez" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form_register.control}
                            name="last_name_2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Segundo apellido</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Perez" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form_register.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="correo@test.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form_register.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            onClick={() => {
                                console.log('Register donor')
                            }}
                        >
                            Registrarme
                        </Button>
                    </form>
                </Form>
            </TabsContent>
        </Tabs>
    )
}

