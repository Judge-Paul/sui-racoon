module sui_racoon::badge {

    use sui::clock::{Self, Clock};
    use sui_racoon::organizer_pass;

    public struct Badge has key, store {
        id: UID,

        title: vector<u8>,
        description: vector<u8>,
        category: vector<u8>,

        issuer: address,
        issued_at: u64,

        evidence_url: vector<u8>
    }

    public fun issue(
        pass: &organizer_pass::OrganizerPass,
        clock: &Clock,

        title: vector<u8>,
        description: vector<u8>,
        category: vector<u8>,
        evidence_url: vector<u8>,

        ctx: &mut TxContext
    ): Badge {
        let sender = tx_context::sender(ctx);

        organizer_pass::assert_valid(pass, sender);

        Badge {
            id: object::new(ctx),
            title,
            description,
            category,
            issuer: sender,
            issued_at: clock::timestamp_ms(clock),
            evidence_url
        }
    }
}
