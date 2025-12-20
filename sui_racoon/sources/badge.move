module sui_racoon::badge {
    use std::string::{String};
    use sui::clock::{Self, Clock};

    public struct Badge has key, store {
        id: UID,
        title: String,
        description: String,
        category: String,
        issuer: address,
        issued_at: u64,
        evidence_url: String
    }

    /// Internal helper to create a badge object
    public fun issue(
        clock: &Clock,
        title: String,
        description: String,
        category: String,
        evidence_url: String,
        ctx: &mut TxContext
    ): Badge {
        let sender = tx_context::sender(ctx);

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

    /// Single mint and transfer
    entry fun mint_and_transfer(
        clock: &Clock,
        recipient: address,
        title: String,
        description: String,
        category: String,
        evidence_url: String,
        ctx: &mut TxContext
    ) {
        let badge = issue(clock, title, description, category, evidence_url, ctx);
        transfer::public_transfer(badge, recipient);
    }

    /// Batch minting: One metadata set sent to multiple recipients
    entry fun mint_many_and_transfer(
        clock: &Clock,
        mut recipients: vector<address>,
        title: String,
        description: String,
        category: String,
        evidence_url: String,
        ctx: &mut TxContext
    ) {
        while (!vector::is_empty(&recipients)) {
            let recipient = vector::pop_back(&mut recipients);
            // We use the fields to create new badges. 
            // Note: In Move, we must pass by value, so we clone the strings for each loop.
            let badge = issue(
                clock, 
                title, 
                description, 
                category, 
                evidence_url, 
                ctx
            );
            transfer::public_transfer(badge, recipient);
        }
    }

    // ============ Getters ============
    public fun get_title(badge: &Badge): String { badge.title }
    public fun get_description(badge: &Badge): String { badge.description }
}