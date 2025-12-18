module sui_racoon::organizer_pass {


    /// Capability NFT: permission to issue badges
    public struct OrganizerPass has key {
        id: UID,
        owner: address,
        active: bool
    }

    /// Admin Capability to authorize new organizers
    public struct AdminCap has key, store {
        id: UID
    }

    fun init(ctx: &mut TxContext) {
        let admin_cap = AdminCap {
            id: object::new(ctx)
        };
        transfer::transfer(admin_cap, tx_context::sender(ctx));
    }

    /// Called only by Racoon / campus system wallet (requires AdminCap)
    public fun mint(
        _: &AdminCap,
        recipient: address,
        ctx: &mut TxContext
    ): OrganizerPass {
        OrganizerPass {
            id: object::new(ctx),
            owner: recipient,
            active: true
        }
    }

    /// Disable issuing power without deleting history
    public fun revoke(pass: &mut OrganizerPass) {
        pass.active = false;
    }

    /// Used by badge issuance
    public fun assert_valid(
        pass: &OrganizerPass,
        sender: address
    ) {
        assert!(pass.active, 0);
        assert!(pass.owner == sender, 1);
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}
