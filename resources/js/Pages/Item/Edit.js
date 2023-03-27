import React, { useEffect, useState } from "react";

import { updateItem } from "../../Api";
import Input from "@/Components/Global/Input";
import Label from "@/Components/Global/Label";
import Combobox from "@/Components/Global/Combobox";
import SidePanel from '@/Components/Global/SidePanel';
// add item props
export default function Edit({ items, onClose, onUpdate }) {
    const [name, setName] = useState(0)
    const [item, setItem] = useState(null)

    useEffect(() => {
        if (!item) return;

        setName(item.name)
        if (item.item) {
            setItem(item.item)
        }
    }, [item])

    const update = () => {
        updateItem({
            id: item.id,
            name,
            itemId: item.id
        })
            .then(({ data }) => {
                onUpdate(data.updateItem)
                setItem(null)
            })
            .catch(console.error);
    }

    let isReady = name != '' && item != null;

    return (
        <SidePanel toggleOpen={!item ? false : true}
            onClose={onClose}
            title={"Edit Item"}>
            {
                item &&
                <div>
                    <div>
                        <Label forInput="name" value="Name" />

                        <Input
                            type="text"
                            name="name"
                            value={name}
                            className="mt-1 block w-full"
                            handleChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3 mt-4">
                        <Combobox
                            label="item"
                            items={items}
                            initialSelectedItem={item}
                            onChange={(item) => setItem(item)}
                            displayInputValue={(item) => item?.name ?? ''}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {isReady &&
                            <button onClick={update} className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150">
                                Update
                            </button>
                        }
                        {!isReady &&
                            <button className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150 opacity-25" disabled>
                                Update
                            </button>
                        }
                    </div>
                </div>
            }
        </SidePanel>
    )
}