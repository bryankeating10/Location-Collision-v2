import { useEffect, useState} from "react";
import axios from "axios";

interface Casinos {
    id: number;
    name: string;
    network: string;
    active: boolean;
    signup_rest: boolean;
    deposit_rest: boolean;
    play_rest: boolean;
    withdrawal_rest: boolean;
    network_rest: boolean;
    created_at: string;
    updated_at: string;
}