export interface House {
    id: number;
    name: string; // Required - 50 chars max
    phone: string; // Required - 50 chars max
    description: string; // Required - 1000 chars max
    specialities: string; // Required - 500 chars max
    address: string; // Required - 200 chars max
    hourMin: string; // Required
    hourMax: string; // Required
    admContact: { // Required
        name: string; // Required - 200 chars max
        lastname: string; // Required - 200 chars max
        phone: string; // Required - 100 chars max
        mail: string; // Required - 100 chars max
    };
    comContact: { // Required if idemAdmContact == true
        idemAdmContact: boolean;
        name: string; // Required - 200 chars max
        lastname: string; // Required - 200 chars max
        phone: string; // Required - 100 chars max
        mail: string; // Required - 100 chars max
    };
}
