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
// import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { HiOutlinePencilSquare, HiOutlinePlusSmall } from "react-icons/hi2";

// import { axiosClient } from "@/api/client"
import { AddDonation } from "@/components/donation_add_form"
import { axiosClient } from "@/api/client"

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
    const [showAddDonation, setShowAddDonation] = useState(false);
    const [dataToShow, setDataToShow] = useState({});

    useEffect(() => {
        (async() => {
            const response = await axiosClient.get('/api/donations', {
                params: {
                    page: 1,
                    limit: 100
                }
            })
            setItems(response.data.data)
        })()
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: dataToShow.name,
            description: dataToShow.description
        },
        values: {
            name: dataToShow.name,
            description: dataToShow.description
        }
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {
        console.log(values)
    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-start p-4">
            <div className="flex flex-row items-center mb-4">
                <h2 className="font-bold text-2xl mr-4">Mis donaciones</h2>
                <Button
                    className="rounded-full p-3"
                    onClick={() => {
                        setShowAddDonation(true)
                    }}
                >
                    <HiOutlinePlusSmall />
                </Button>
                {/* Dialog para agregar donación */}
                <Dialog
                    open={showAddDonation}
                >
                <DialogContent className="w-full sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Realizar donación</DialogTitle>
                        </DialogHeader>
                        <AddDonation closeForm={setShowAddDonation}/>
                </DialogContent>
                </Dialog>
            </div>
            <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {/* Dialog para ver donación */}
                <Dialog
                    open={showDialog}
                >
                    <DialogContent className="w-full sm:max-w-[425px]">
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
                                        src={dataToShow.imageUrl}
                                        alt={dataToShow.description}
                                        className="w-full"
                                    />
                                </figure>
                                <Button type="submit" className="w-full">Guardar</Button>
                            </form>
                        </Form>
                        <DialogFooter className="w-full">
                            <div className="w-full flex flex-row justify-between space-x-4">
                                <Button
                                    variant="destructive"
                                    className="w-6/12"
                                    onClick={() => {
                                        console.log('Eliminar');
                                    }}
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    className="w-6/12"
                                    onClick={() => {
                                        setShowDialog(false);
                                        setDataToShow({});
                                    }}
                                >
                                    Cerrar
                                </Button>
                            </div>
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
                                    src={item.imageUrl}
                                    alt={item.description}
                                    className="w-full"
                                />
                            </figure>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <CardDescription className="flex flex-col">
                                <span>
                                    {item.category.key.charAt(0).toUpperCase() + item.category.key.slice(1)}
                                </span>
                                <span>
                                    {item.donationStatus.key.charAt(0).toUpperCase() + item.donationStatus.key.slice(1)}
                                </span>
                            </CardDescription>
                            {
                                item.donationStatus.key === 'pendiente' ? (
                                    <Button
                                        onClick={() => {
                                            setShowDialog(true);
                                            setDataToShow(item);
                                        }}
                                    >
                                        <HiOutlinePencilSquare />
                                    </Button>
                                ) : <Button disabled>
                                        <HiOutlinePencilSquare />
                                    </Button>
                            }
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export { DonorHome }