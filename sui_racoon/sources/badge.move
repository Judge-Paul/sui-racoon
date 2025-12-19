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

    /// Entry function to mint a badge and transfer it directly to a student
    entry fun mint_and_transfer(
        pass: &organizer_pass::OrganizerPass,
        clock: &Clock,
        recipient: address,
        title: vector<u8>,
        description: vector<u8>,
        category: vector<u8>,
        evidence_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let badge = issue(pass, clock, title, description, category, evidence_url, ctx);
        transfer::public_transfer(badge, recipient);
    }

    // ============ Getter Functions ============

    public fun get_title(badge: &Badge): vector<u8> {
        badge.title
    }

    public fun get_description(badge: &Badge): vector<u8> {
        badge.description
    }

    public fun get_category(badge: &Badge): vector<u8> {
        badge.category
    }

    public fun get_issuer(badge: &Badge): address {
        badge.issuer
    }

    public fun get_issued_at(badge: &Badge): u64 {
        badge.issued_at
    }

    public fun get_evidence_url(badge: &Badge): vector<u8> {
        badge.evidence_url
    }
}
