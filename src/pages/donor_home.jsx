import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DonationEdit } from "@/components/donation_edit"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "El nombre no debe estar vacío",
    }),
    description: z.string().min(3, {
        message: "La descripción no debe estar vacía",
    }),
})

function DonorHome() {
    const [items, setItems] = useState([])
    const [showDialog, setShowDialog] = useState(false);
    const [dataToShow, setDataToShow] = useState({});

    useEffect(() => {
        (async() => {
            setItems([
                { id: 1, name: 'Cell Phone', description: 'A mobile phone in working condition', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 2, name: 'Jacket', description: 'A warm winter jacket', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 3, name: 'Pants', description: 'A pair of jeans', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 4, name: 'Cups', description: 'A set of ceramic cups', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 5, name: 'Microwave', description: 'A used microwave in good condition', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 6, name: 'Chair', description: 'A wooden chair', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 7, name: 'Table', description: 'A small dining table', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 8, name: 'Laptop', description: 'A working laptop', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 9, name: 'Watch', description: 'A wristwatch in good condition', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 10, name: 'Sneakers', description: 'A pair of sports sneakers', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 11, name: 'Toy', description: 'A children’s toy', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 12, name: 'Book', description: 'A used book in good condition', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 13, name: 'Camera', description: 'A digital camera', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 14, name: 'Headphones', description: 'A pair of over-ear headphones', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 15, name: 'Mug', description: 'A ceramic coffee mug', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 16, name: 'Mirror', description: 'A wall mirror', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 17, name: 'Shelf', description: 'A small bookshelf', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 18, name: 'Cushion', description: 'A soft cushion', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 19, name: 'Bedding', description: 'A set of bedding items', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 20, name: 'Umbrella', description: 'A large umbrella', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 21, name: 'Scissors', description: 'A pair of scissors', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 22, name: 'Knife', description: 'A kitchen knife', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 23, name: 'Plate', description: 'A dinner plate', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 24, name: 'Frying Pan', description: 'A non-stick frying pan', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 25, name: 'Cutlery', description: 'A set of cutlery', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 26, name: 'Paint', description: 'A can of paint', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 27, name: 'Plant', description: 'A potted plant', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' },
                { id: 28, name: 'Guitar', description: 'An acoustic guitar', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'pending' },
                { id: 29, name: 'Bicycle', description: 'A used bicycle', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'delivered' },
                { id: 30, name: 'Suitcase', description: 'A rolling suitcase', img_url: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', status: 'available' }
            ])
        })()
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
        values: {
            name: dataToShow.name,
            description: dataToShow.description
        }
    })

    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="w-full h-full flex justify-center items-center py-4">
            <div className="container sm:11/12 sm:grid sm:gap-4 sm:grid-cols-1 sm:auto-rows-auto md:grid md:gap-4 md:grid-cols-3 md:auto-rows-auto lg:grid lg:gap-4 lg:grid-cols-4 lg:auto-rows-auto xl:grid xl:gap-4 xl:grid-cols-5 xl:auto-rows-auto">
                <Dialog
                    open={showDialog}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Editar donación</DialogTitle>
                            <DialogDescription>
                                {dataToShow.description}
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <figure>
                                    <img
                                        src={dataToShow.img_url}
                                        alt={dataToShow.description}
                                        className="w-full"
                                    />
                                </figure>
                                <Button type="submit" className="w-full">Guardar</Button>
                            </form>
                            <Button
                                variant="destructive"
                                className="w-3/12"
                                onClick={() => {
                                    console.log('Eliminar');
                                }}
                            >
                                Eliminar
                            </Button>
                        </Form>
                        <DialogFooter>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {items.map(item => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <figure>
                                <img
                                    src={item.img_url}
                                    alt={item.description}
                                    className="w-full"
                                />
                            </figure>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <CardDescription>{item.status}</CardDescription>
                            {
                                item.status === 'available' ? (
                                    <Button
                                        onClick={() => {
                                            setShowDialog(true);
                                            setDataToShow(item);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                ): <Button disabled>Editar</Button>
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export { DonorHome }