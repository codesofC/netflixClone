import { create } from "zustand";

export const useStore = create((set) => ({
    list: [],
    addOrRemoveToList: (item) => set((state) => {
        const indexFind = state.list.findIndex(obj => obj.jawSummary.id === item.jawSummary.id)

        if(indexFind !== -1){
            const newList = state.list.filter(obj => obj.jawSummary.id !== item.jawSummary.id)

            return ({
                list: newList
            })
        }else{
            const newList = [...state.list]
            newList.push(item)

            return ({
                list: newList
            })
        }
    })
}))