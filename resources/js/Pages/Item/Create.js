import React, { useEffect, useState } from 'react';

import Input from "@/Components/Global/Input";
import Label from "@/Components/Global/Label";
import Combobox from "@/Components/Global/Combobox";
import SidePanel from '@/Components/Global/SidePanel';
import { createItem } from '../../Api';

export default function Edit({ items, showCreate, onClose, onCreate }) {
    const [name, setName] = useState('')
    const [itemId, setItemId] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsReady(name != '' && itemId != 0 ? true : false);
    }, [name, itemId])

    const create = () => {
        if (loading || !isReady) { return; }
        setLoading(true);

        createItem({
            name,
            itemId
        })
            .then(({ data }) => {
                onCreate(data.createItem)
                setItemId(0)
                setName('')
                setLoading(false);
            })
            .catch(console.error);
    }

    return (
        <SidePanel toggleOpen={showCreate}
            onClose={onClose}
            title={"Create Item"}>
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
                        label="Brand"
                        items={items}
                        onChange={(item) => setItemId(item.id)}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button onClick={create} className={`inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150 ${isReady ? '' : 'disabled opacity-25'}`}>
                        {loading && <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>}
                        Create
                    </button>
                </div>
            </div>
        </SidePanel>
    )
}