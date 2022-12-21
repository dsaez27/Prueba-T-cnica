import { useQuery } from "react-query";
import { useTracker } from "meteor/react-meteor-data";
import { PacientesCollection } from "/imports/api/pacientes";

export const usePacientes = (page: number) => {
    const res = useTracker(() => {
        return PacientesCollection.find(
            {},
            {
                limit: 3,
                skip: page * 3,
                sort: { createdAt: -1 },
            }
        ).fetch();
    }, [page]);

    const productQuery = useQuery(["pacients", page], () => res, {
        refetchInterval: 1000,
    });

    return productQuery;
};
