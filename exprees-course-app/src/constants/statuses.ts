// Interface de error de JWT
export interface ErrorInterface {
  [error: string]: {
    status: number;
    message: string;
  };
}

export interface StatusCodeInterface {
  // Codigos de estado satisfactorios
  OK: number;
  CREATED: number;
  UPDATED: number;
  // Coddigos de estado erroneos (Parte del cliente)
  BADREQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOTFOUND: number;
  MISSINGREQUIRED: number;
  BADDATE: number;
  BADFORMAT: number;
  BADCURP: number;
  BADSSN: number;
  BADTAXID: number;
  DUPLICATED: number;
  BADSTATUS: number;
  BADGRADEGROUP: number;
  BADSHIFT: number;
  BADCONTACTINFO: number;
  BADACADEMIC: number;
  BADEMAIL: number;
  BADKEYSEP: number;
  BADPASSW: number;
  BADGENDER: number;
  INCORRECTACTION: number;
  SERVERERROR: number;
  CANTREADFILE: number;
  DBERROR: number;
}

// Se establecen los codigos de estado HTTP
export const statuses: StatusCodeInterface = {
  // Codigos de estado satisfactorios
  OK: 200,
  CREATED: 201,
  UPDATED: 202,
  // Coddigos de estado erroneos (Parte del cliente)
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  BADPASSW: 405,
  MISSINGREQUIRED: 420,
  BADDATE: 421,
  BADFORMAT: 422,
  BADCURP: 423,
  BADSSN: 424,
  BADTAXID: 425,
  DUPLICATED: 427,
  BADSTATUS: 428,
  BADACADEMIC: 430,
  BADGRADEGROUP: 431,
  BADSHIFT: 432,
  BADCONTACTINFO: 440,
  BADEMAIL: 441,
  BADKEYSEP: 443,
  BADGENDER: 444,
  INCORRECTACTION: 445,
  // Coddigos de estado erroneos (Parte del servidor)
  SERVERERROR: 500,
  CANTREADFILE: 515,
  DBERROR: 516,
};
