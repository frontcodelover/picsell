import {useEffect, useState} from 'react'
import { supabase } from '@/lib/initSupabase';

interface FetchParams {
  compared_id: string | number;
  dbName: string;
  dbField: string;
  selected?: string;
}

export const useFetch = ({compared_id, dbName, dbField, selected}: FetchParams) => {
	const [dataGet, setDataGet] = useState<any[]>([]);
	const [seleted, setSelected] = useState(selected || "*");

	useEffect(() => {
		const fetchPhotosById = async () => {
			try {
				const { data, error } = await supabase.from(`${dbName}`).select(seleted).eq(`${dbField}`, compared_id);
				console.log("CUSTOM", data)
				if (error) {
					throw new Error('Erreur lors de la récupération des photos');
				}
				setDataGet(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPhotosById();
	}
	, [compared_id, dbName, dbField, selected]);

	return (
		{dataGet}
	)
}
