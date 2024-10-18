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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const formSchema = z.object({
     description: z.string().min(3, {
        message: "El nombre debe tener minimo 8 caracteres",
    }),
     centro_acopio_id: z.string().min(0, {
        message: "Selecciona",
    }),
     category_id: z.string().min(0, {
        message: "Selecciona",
    }),
})

export function FilterRequest() {
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-row gap-4 justify-end items-center">
              <HiOutlineMagnifyingGlass />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-row gap-4 justify-center items-center">
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
          <FormField
            className="w-4/12"
                control={form.control}
                name="centro_acopio_id"
                render={({ field }) => (
                    <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Centro de acopío" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="1">UTNogales</SelectItem>
                        <SelectItem value="2">UTHermosillo</SelectItem>
                        <SelectItem value="3">UTPuertoPeñasco</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                    <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="1">Electrodomestico</SelectItem>
                        <SelectItem value="2">Despensa</SelectItem>
                        <SelectItem value="3">Ropa</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button className="w-1/12" type="submit">Buscar</Button>
            </form>
        </Form>
    )
}

