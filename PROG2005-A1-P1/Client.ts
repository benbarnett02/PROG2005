export class Client {
    public readonly id: string; // Using a string - we're never going to do math on it so why constrain ourselves to a number?
    public name: string;
    public gender: enumGender;
    public dateOfBirth: Date;
    public program: enumProgram;

    private _email!: string;
    private _phoneNumber!: string;

    public startDate: Date;
    public endDate: Date;

    public notes?: string;
    public vip: boolean = false;

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (value.length > 0 && value.indexOf("@") > 0) {
            this._email = value;
        } else {
            throw new Error("Invalid email address");
        }
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }

    public set phoneNumber(value: string) {
        if (value.length == 10 && value.indexOf("04") == 0) { // Maybe we only want Australian numbers & no country code (start with 04)
            this._phoneNumber = value;
        } else {
            throw new Error("Invalid phone number");
        }
    }

constructor(id: string, name: string, gender: enumGender, dateOfBirth: Date, program: enumProgram, email: string, phoneNumber: string, startDate: Date, endDate: Date, notes?: string) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.program = program;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }

}

export enum enumGender {
    unspecified = "Unspecified",
    female = "Female",
    male = "Male"
}

export enum enumProgram {
    unspecified = "Unspecified",
    FatLoss = "Fat Loss",
    Senior = "Senior Fitness",
    Muscle = "Muscle Gain",
    Natal = "Pre/Post Natal Fitness",
    Contest = "Contest Preparation",
    General = "Overall Fitness"
}