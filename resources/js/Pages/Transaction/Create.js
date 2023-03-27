import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';

import Input from "@/Components/Global/Input";
import Label from "@/Components/Global/Label";
import { createTransaction } from "../../Api";
import Combobox from "@/Components/Global/Combobox";
import SidePanel from '@/Components/Global/SidePanel';
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from "@/Components/Global/InvoicePdf";
export default function Create({ brands, items, showCreate, onClose, onCreate }) {

    // todo: query items from database to here.
    const [amount, setAmount] = useState(0);
    const [brand, setBrand] = useState(null);
    const [item, setItem] = useState(null);
    const [createdAt, setCreatedAt] = useState('');
    const [note, setNote] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invoiceDisplay, setInvoiceDisplay] = useState(false)
    const [invoiceComponent, setInvoiceComponent] = useState('');
    const [newData, setNewData] = useState(null);

    useEffect(() => {
        setIsReady(amount != 0 && brand != null && createdAt != '' ? true : false);
    }, [amount, brand, createdAt])

    const create = () => {
        if (loading || !isReady) { return; }
        setLoading(true);

        createTransaction({
            amount,
            brandId: brand.id,
            createdAt,
            note,
            itemId: item.id // i added this field for items
        })
            .then(({ data }) => {
                // onCreate(data.createTransaction)
                setInvoiceComponent(<Invoice invoiceData={data.createTransaction} />)
                setNewData(data.createTransaction);
                setInvoiceDisplay(true);
                setBrand(null)
                setAmount(0)
                setItem(null) // i added this
                setCreatedAt('')
                setNote('')
                setLoading(false);
            })
            .catch(console.error);
    }

    function refreshPage() {
        onCreate(newData)
    }

    return (
        <SidePanel toggleOpen={showCreate}
            onClose={onClose}
            title={"Create Transaction"}>
            <div>
                <div>
                    <Label forInput="amount" value={`Amount (${AppCurrency})`} />

                    <Input
                        type="text"
                        name="amount"
                        value={amount}
                        className="mt-1 block w-full"
                        handleChange={(e) => setAmount(e.target.value > 0 ? e.target.value : 0)}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="date" value="Date" />

                    <Input
                        type="date"
                        name="date"
                        value={createdAt}
                        className="mt-1 block w-full"
                        handleChange={(e) => setCreatedAt(e.target.value)}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 mt-4">
                    <Combobox
                        label="Brand"
                        items={brands}
                        onChange={(item) => setBrand(item)}
                        displayInputValue={(item) => item ? `${item.name} (${item.category?.name ?? 'N/A'})` : ''}
                        displayOptionValue={(item) => item ? `${item.name} (${item.category?.name ?? 'N/A'})` : ''}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3 mt-4">
                    <Combobox
                        label="Items"
                        items={items}
                        onChange={(item) => setItem(item)}
                        displayInputValue={(item) => item ? `${item.name}` : ''}
                        displayOptionValue={(item) => item ? `${item.name}` : ''}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="note" value="Note (optional)" />

                    <Input
                        type="text"
                        name="note"
                        value={note}
                        className="mt-1 block w-full"
                        handleChange={(e) => setNote(e.target.value)}
                    />
                </div>


                <div className="flex items-center justify-start mt-4">
                    <button onClick={create} className={`inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-blue-500 transition ease-in-out duration-150 ${isReady ? '' : 'disabled opacity-25'}`}>
                        {loading && <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>}
                        Create
                    </button>
                </div>
                <PDFDownloadLink style={{ display: invoiceDisplay ? 'block' : 'none' }} onClick={refreshPage} document={invoiceComponent} fileName="inovice.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download Invoice!'
                    }
                </PDFDownloadLink>
            </div>

        </SidePanel>
    )
}