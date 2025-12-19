module sui_racoon::student_profile {

    use sui_racoon::badge;

    public struct StudentProfile has key {
        id: UID,
        owner: address,

        name: vector<u8>,
        // university: vector<u8>,
        profile_picture_url: vector<u8>,

        badges: vector<ID>,
        is_public: bool
    }

    entry fun create(
        name: vector<u8>,
        // university: vector<u8>,
        profile_picture_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let profile = StudentProfile {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            name,
            // university,
            profile_picture_url,
            badges: vector::empty(),
            is_public: true
        };
        transfer::transfer(profile, tx_context::sender(ctx));
    }

    public fun add_badge(
        profile: &mut StudentProfile,
        badge: &badge::Badge,
        ctx: &TxContext
    ) {
        assert!(profile.owner == tx_context::sender(ctx), 0);
        vector::push_back(&mut profile.badges, object::id(badge));
    }

    /// Entry function for students to claim a badge to their profile
    entry fun claim_badge(
        profile: &mut StudentProfile,
        badge: &badge::Badge,
        ctx: &TxContext
    ) {
        add_badge(profile, badge, ctx);
    }

    public fun set_visibility(
        profile: &mut StudentProfile,
        is_public: bool,
        ctx: &TxContext
    ) {
        assert!(profile.owner == tx_context::sender(ctx), 1);
        profile.is_public = is_public;
    }

    public fun has_badge(profile: &StudentProfile, badge_id: ID): bool {
        vector::contains(&profile.badges, &badge_id)
    }

    // ============ Getter Functions ============

    public fun get_name(profile: &StudentProfile): vector<u8> {
        profile.name
    }

    public fun get_owner(profile: &StudentProfile): address {
        profile.owner
    }

    public fun get_badges(profile: &StudentProfile): vector<ID> {
        profile.badges
    }

    public fun get_profile_picture_url(profile: &StudentProfile): vector<u8> {
        profile.profile_picture_url
    }

    public fun is_public(profile: &StudentProfile): bool {
        profile.is_public
    }
}
