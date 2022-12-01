export interface Pet {
	petId?: string;
	petParentId: string;
	petName: string;
	petBreed: string;
	petSex: string;
	petColor: string;
	petDob: Date;
	petWeight: number;
	petHair: string;
	petSpayNeuter: boolean;
	petRabiesDate: Date;
	petRabiesType: string;
	petDhppDate: Date;
	petDhppType: string;
	petBordetellaDate: Date;
	petFleaControl: boolean;
	petFood: boolean;
	petMeds: boolean;
	petFoodInfo: string;
	petMedInfo: string;
}
