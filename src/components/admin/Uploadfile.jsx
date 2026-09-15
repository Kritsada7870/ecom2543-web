import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ResizerModule from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { LoaderCircle } from 'lucide-react';

const Resizer = ResizerModule.default || ResizerModule

const Uploadfile = ({ form, setForm }) => {

    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {

        setIsLoading(true)

        const files = e.target.files
        if (!files?.length) return
        setIsLoading(true)
        let allFiles = form.images
        for (let i = 0; i < files.length; i++) {
            // console.log(files[i])

            const file = files[i]
            if (!file.type.startsWith('image/')) {
                toast.error(`File ${file.name} บ่แม่นรูป`)
                continue
            }

            // Image Resize
            Resizer.imageFileResizer(
                files[i],
                720,
                720,
                "JPEG",
                100,
                0,
                (data) => {
                    // endpoint Backend
                    // console.log(data, data)
                    uploadFiles(token, data)
                        .then((res) => {
                            console.log(res)

                            allFiles.push(res.data)
                            setForm({
                                ...form,
                                images: allFiles
                            })
                            setIsLoading(false)
                            toast.success('Upload image Sucess!!!')
                        })
                        .catch((err) => {
                            console.log(err)
                            setIsLoading(false)
                        })
                },
                "base64"
            )
        }
    }
    console.log(form)

    const handleDelete = (public_id) => {
        // console.log(public_id)
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => {
                    console.log(item)
                    return item.public_id !== public_id
                })

                console.log('filterImages', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='my-5'>
            <div className='flex mx-5 gap-5 my-5'>


                {
                    isLoading && <LoaderCircle className=' animate-spin' />
                }

                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-125'
                                src={item.url} />
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute top-0 right-0
                             bg-sky-500 p-1 rounded-md'>X</span>
                        </div>
                    )
                }



            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type="file"
                    name="images"
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile