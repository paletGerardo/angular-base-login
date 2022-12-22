export interface PersonalDataForm{
    "document_type":string;
    "document_number":string;
    "name":string;
    "lastname":string;
    "id_genre":string;
    "birthdate":string;
    "email":string;
    "address":string;
    "phone":[
        {
            "phone_type":string,
            "cod_area":string,
            "number":string
        }
    ];

}