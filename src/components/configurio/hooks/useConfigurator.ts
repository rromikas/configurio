import { supabase } from '../supabase';
import { useEffect, useState } from 'react';
import { Configurator } from '../types';

export const useConfigurator = (id: string) => {
  const [configurator, setConfigurator] = useState<Configurator>();

  useEffect(() => {
    supabase
      .from('configurators')
      .select('*')
      .eq('id', id)
      .limit(1)
      .single()
      .then((res) => {
        if (res.data) {
          setConfigurator(res.data as Configurator);
        }
      });
  }, []);

  return configurator;
};
