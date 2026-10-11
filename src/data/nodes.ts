import type { Node } from "../lib/types";

export const NODES: Record<string, Node> = {
  // =========================
  // RACE
  // =========================
  race: {
    id: "race",
    label: "1. Race",
    icon: "🧬",
    theme: "blue",
    segments: [
      // common
      { label: "Human", weight: 12 },
      { label: "Elf", weight: 9 },
      { label: "Dwarf", weight: 9 },
      { label: "Orc", weight: 8 },
      { label: "Goblins", weight: 8 },
      { label: "Dryad", weight: 7 },
      { label: "Merfolk", weight: 7 },
      { label: "Golem", weight: 7 },
      { label: "Werebeasts", weight: 7 },

      // fantasy
      { label: "Fey", weight: 6 },
      { label: "Elemental", weight: 6 },
      { label: "Giant", weight: 6 },
      { label: "Mythical Beast", weight: 5 },
      { label: "Vampire", weight: 5 },

      // darker / divine
      {
        label: "Angel",
        weight: 5,
        effects: [
          { type: "stat", stat: "dur", delta: 1, reason: "Angelic Grace" },
          { type: "stat", stat: "iq", delta: 1, reason: "Angelic Grace" }
        ]
      },
      {
        label: "Demon",
        weight: 5,
        effects: [
          { type: "stat", stat: "str", delta: 2, reason: "Demonic Might" },
          { type: "stat", stat: "iq", delta: -1, reason: "Demonic Temptation" }
        ]
      },
      {
        label: "Devil",
        weight: 4,
        effects: [{ type: "stat", stat: "str", delta: 2, reason: "Infernal Edge" }]
      },

      // profession
      {
        label: "Dragon Slayer",
        weight: 4,
        effects: [
          { type: "stat", stat: "str", delta: 2, reason: "Slayer Training" },
          { type: "stat", stat: "dur", delta: 1, reason: "Slayer Training" }
        ]
      },

      // tech / odd
      { label: "Animorph", weight: 5 },
      {
        label: "Cyborg",
        weight: 4,
        effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Cybernetics" }]
      },
      {
        label: "Hive Mind",
        weight: 4,
        effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Collective Thought" }]
      },

      // meta
      { label: "Reincarnation", weight: 3 },
      { label: "Spirit", weight: 2 },

      // cosmic tiers
      {
        label: "Cosmic Warrior",
        weight: 2,
        effects: [
          { type: "stat", stat: "spd", delta: 2, reason: "Cosmic Warrior" },
          { type: "stat", stat: "dur", delta: 2, reason: "Cosmic Warrior" }
        ]
      },
      {
        label: "Demi-God",
        weight: 2,
        effects: [
          { type: "stat", stat: "str", delta: 2, reason: "Demi-God" },
          { type: "stat", stat: "spd", delta: 1, reason: "Demi-God" },
          { type: "stat", stat: "dur", delta: 1, reason: "Demi-God" }
        ]
      },
      {
        label: "God",
        weight: 1,
        effects: [
          { type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 3, reason: "Godhood (major)" },
          { type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 3, reason: "Godhood (major)" },
          { type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Godhood (minor)" }
        ]
      },
      {
        label: "Primordial",
        weight: 1,
        effects: [
          { type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 4, reason: "Primordial Core" },
          { type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Primordial Echo" }
        ]
      },

      // extras
      { label: "Titan", weight: 3, effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Titan Frame" }] },
      { label: "Beastfolk", weight: 6, effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Beast Instinct" }] },
      {
        label: "Dragon",
        weight: 3,
        effects: [
          { type: "stat", stat: "str", delta: 1, reason: "Draconic Blood" },
          { type: "stat", stat: "dur", delta: 1, reason: "Draconic Blood" }
        ]
      },
      { label: "Siren", weight: 4, effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Siren Cunning" }] },
      { label: "Android", weight: 4, effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Synthetic Mind" }] },
      { label: "Centaur", weight: 5, effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Born Runner" }] },
      {
        label: "Genie",
        weight: 4,
        effects: [
          { type: "stat", stat: "iq", delta: 1, reason: "Arcane Contract" },
          { type: "stat", stat: "spd", delta: 1, reason: "Arcane Contract" }
        ]
      },

      // special engine-handled
      { label: "Symbiotic", weight: 1 },
      { label: "Hybrid", weight: 1 }
    ]
  },

  // Dynamic segment nodes (engine reuses race.segments for these)
  hybrid_race_a: { id: "hybrid_race_a", label: "1.1 Hybrid Race A", icon: "🧬", theme: "blue", segments: [] },
  hybrid_race_b: { id: "hybrid_race_b", label: "1.2 Hybrid Race B", icon: "🧬", theme: "blue", segments: [] },
  symbiote_host_race: { id: "symbiote_host_race", label: "1.2 Host Race", icon: "🧩", theme: "blue", segments: [] },

  symbiote_takeover: {
    id: "symbiote_takeover",
    label: "1.1 Symbiote Takeover",
    icon: "🫀",
    theme: "purple",
    segments: ["30%", "40%", "50%", "60%", "70%", "80%", "90%", "95%", "99%", "100%"].map((s) => ({ label: s }))
  },

  // =========================
  // RACE PATHS
  // =========================
  human_origin: {
    id: "human_origin",
    label: "Human — Origin",
    icon: "🧭",
    theme: "gray",
    segments: [
      { label: "NPC" },
      { label: "Old Bloodline", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Old Bloodline" }] },
      { label: "Chosen One", effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Chosen One" }] }
    ]
  },

  elf_origin: {
    id: "elf_origin",
    label: "Elf — Origin",
    icon: "🏹",
    theme: "teal",
    segments: [
      { label: "Wood Elf" },
      { label: "High Elf", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "High Elf" }] },
      { label: "Dark Elf", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Dark Elf" }] },
      { label: "Elemental Elf", effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Elemental Elf" }] },
      { label: "Chosen One", effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Elf Chosen One" }] }
    ]
  },

  elf_rizz: {
    id: "elf_rizz",
    label: "Elf — Rizz Level",
    icon: "💫",
    theme: "purple",
    segments: [
      { label: "Negative" },
      { label: "Rusty" },
      { label: "Regular" },
      { label: "Remarkable" },
      { label: "Revolutionary" },
      { label: "Infinite", effects: [{ type: "tag", tag: "INFINITE_RIZZ", reason: "Infinite Rizz" }] }
    ]
  },

  elf_ability: {
    id: "elf_ability",
    label: "Elf — Ability",
    icon: "🍃",
    theme: "teal",
    segments: [
      { label: "Enhanced Senses", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Enhanced Senses" }] },
      { label: "Spirit Guardians", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Spirit Guardians" }] },
      { label: "Shapeshifting", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Shapeshifting" }] },
      { label: "Animal Control" },
      { label: "Nature Manipulation", effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Nature Manipulation" }] }
    ]
  },

  dwarf_ability: {
    id: "dwarf_ability",
    label: "Dwarf — Ability",
    icon: "🍺",
    theme: "gray",
    segments: [{ label: "Beer Rune", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Beer Rune" }] }]
  },

  orc_role: {
    id: "orc_role",
    label: "Orc — Role in the Tribe",
    icon: "🪓",
    theme: "red",
    segments: [
      { label: "Bard", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Orc Bard" }] },
      { label: "Blacksmith", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Orc Blacksmith" }] },
      { label: "Berserker", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Orc Berserker" }] },
      { label: "Shaman", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Orc Shaman" }] },
      { label: "Warlord", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Orc Warlord" }, { type: "stat", stat: "dur", delta: 1, reason: "Orc Warlord" }] }
    ]
  },
  
    fey_powers: {
    id: "fey_powers",
    label: "Fey — Powers",
    icon: "🧚",
    theme: "purple",
    segments: [
      { label: "Healing" },
      {
        label: "Healing + Shapeshifting",
        effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Fey Shapeshifting" }]
      },
      {
        label: "Healing + Shapeshifting + Invisibility",
        effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Fey Invisibility" }]
      },
      {
        label: "Healing + Shapeshifting + Invisibility + Photokinesis",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Photokinesis" }]
      }
    ]
  },

  elemental_calamity: {
    id: "elemental_calamity",
    label: "Elemental — Calamity Level",
    icon: "🌪️",
    theme: "blue",
    segments: [
      { label: "Tsunami Born — Negligible" },
      { label: "Eruption Heart — Minor" },
      { label: "Hurricane Child — Moderate" },
      { label: "Thunderstorm Spirit — Significant" },
      { label: "Blizzard Blood — Severe" },
      {
        label: "Sun's Radiance — Critical",
        effects: [{ type: "stat", stat: "str", delta: 1, reason: "Sun's Radiance" }]
      },
      {
        label: "Eclipse Shadow — Apocalyptic",
        effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Eclipse Shadow" }]
      },
      {
        label: "Extinction-Level",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Extinction-Level" }]
      },
      {
        label: "Universe-Ending",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 3, reason: "Universe-Ending" }]
      }
    ]
  },

  dryad_origin: {
    id: "dryad_origin",
    label: "Dryad — Origin",
    icon: "🌿",
    theme: "teal",
    segments: [
      { label: "Tree Born", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Tree Born" }] },
      { label: "Natural Phenomena" },
      { label: "Moon Child", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Moon Child" }] },
      {
        label: "Celestial Alignment",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Celestial Alignment" }]
      },
      { label: "Nature's Wrath", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Nature's Wrath" }] }
    ]
  },

  giant_domain: {
    id: "giant_domain",
    label: "Giant — Domain",
    icon: "🗻",
    theme: "blue",
    segments: [
      { label: "Arctic Titan → Colossal Stomp" },
      { label: "Mountain Monarch → Rock Hurling" },
      { label: "Forest Behemoth → Stone Skin" },
      { label: "Desert Colossus → Earthquake" },
      { label: "Ocean Leviathan → Gigantic Roar" },
      { label: "Inferno Elders → Mountain Shapers" },
      {
        label: "Celestial Sentinel → Seismic Impact",
        effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Celestial Sentinel" }]
      }
    ]
  },

  goblin_group_size: {
    id: "goblin_group_size",
    label: "Goblins — Group Size",
    icon: "👺",
    theme: "gray",
    segments: ["Alone", "1+", "5+", "10+", "25+", "50+", "100+", "500+", "1000+"].map((s) => ({ label: s }))
  },

  goblin_position: {
    id: "goblin_position",
    label: "Goblins — Group Position",
    icon: "📍",
    theme: "gray",
    segments: [
      { label: "The Leader", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Goblin Leader" }] },
      { label: "Scout", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Goblin Scout" }] },
      { label: "Tinkerer", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Goblin Tinkerer" }] },
      { label: "Shaman", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Goblin Shaman" }] },
      { label: "Bomber" },
      { label: "Beast Handler" },
      { label: "Cutthroat", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Goblin Cutthroat" }] }
    ]
  },

  golem_material: {
    id: "golem_material",
    label: "Golem — Material",
    icon: "🪨",
    theme: "gray",
    segments: [
      { label: "Clay → Regen 0" },
      { label: "Stone → Regen 1" },
      { label: "Iron → Regen 2", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Iron Body" }] },
      { label: "Diamond → Regen 3", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Diamond Body" }] },
      { label: "Obsidian → Regen 4", effects: [{ type: "stat", stat: "dur", delta: 3, reason: "Obsidian Body" }] },
      { label: "Infinite Regeneration", effects: [{ type: "stat", stat: "dur", delta: 4, reason: "Infinite Regeneration" }] }
    ]
  },

  hivemind_type: {
    id: "hivemind_type",
    label: "Hive Mind — Collective",
    icon: "🕸️",
    theme: "purple",
    segments: [
      { label: "Insects Swarm" },
      { label: "Parasite Horde", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Parasite Horde" }] },
      { label: "Mycelial Mass", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Mycelial Mass" }] },
      { label: "Nanite Matrix", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Nanite Matrix" }] },
      { label: "Aquatic Colony", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Aquatic Colony" }] },
      { label: "Shadow Ensemble", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Shadow Ensemble" }] },
      { label: "Psychic Network", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Psychic Network" }] }
    ]
  },

  merfolk_subrace: {
    id: "merfolk_subrace",
    label: "Merfolk — Sub-Race",
    icon: "🧜",
    theme: "blue",
    segments: [
      { label: "Frogling" },
      { label: "Cecelia" },
      { label: "True-Born", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "True-Born" }] },
      { label: "Abyssborn", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Abyssborn" }] }
    ]
  },

  werebeast_form: {
    id: "werebeast_form",
    label: "Werebeasts — Form",
    icon: "🐺",
    theme: "gray",
    segments: [
      { label: "Werewolf", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Werewolf" }] },
      { label: "Werebear", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Werebear" }] },
      { label: "Weretiger", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Weretiger" }] },
      { label: "Wereboar", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Wereboar" }] },
      { label: "Werehawk", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Werehawk" }] },
      { label: "Wereshark", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Wereshark" }] }
    ]
  },

  vampire_souls: {
    id: "vampire_souls",
    label: "Vampire — Souls Consumed",
    icon: "🩸",
    theme: "red",
    segments: [
      { label: "100" },
      { label: "1,000", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Souls Consumed" }] },
      {
        label: "10,000",
        effects: [
          { type: "stat", stat: "str", delta: 1, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 1, reason: "Souls Consumed" }
        ]
      },
      {
        label: "100,000",
        effects: [
          { type: "stat", stat: "str", delta: 2, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 1, reason: "Souls Consumed" }
        ]
      },
      {
        label: "1 Million",
        effects: [
          { type: "stat", stat: "str", delta: 2, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 2, reason: "Souls Consumed" }
        ]
      },
      {
        label: "10 Million",
        effects: [
          { type: "stat", stat: "str", delta: 3, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 2, reason: "Souls Consumed" }
        ]
      },
      {
        label: "1 Billion",
        effects: [
          { type: "stat", stat: "str", delta: 4, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 3, reason: "Souls Consumed" },
          { type: "stat", stat: "dur", delta: 2, reason: "Souls Consumed" }
        ]
      },
      {
        label: "10 Billion",
        effects: [
          { type: "stat", stat: "str", delta: 5, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 4, reason: "Souls Consumed" },
          { type: "stat", stat: "dur", delta: 3, reason: "Souls Consumed" }
        ]
      },
      {
        label: "10 Billion+",
        effects: [
          { type: "stat", stat: "str", delta: 6, reason: "Souls Consumed" },
          { type: "stat", stat: "spd", delta: 5, reason: "Souls Consumed" },
          { type: "stat", stat: "dur", delta: 4, reason: "Souls Consumed" },
          { type: "stat", stat: "iq", delta: -1, reason: "Souls Consumed (corruption)" }
        ]
      },
      
    ]
  }  mythical_beast_type: {
    id: "mythical_beast_type",
    label: "Mythical Beast — Type",
    icon: "🐾",
    theme: "purple",
    segments: [
      { label: "Nemean Lion", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Nemean Lion" }] },
      { label: "Minotaur", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Minotaur" }] },
      { label: "Phoenix", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Phoenix" }] },
      { label: "Pegasus", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Pegasus" }] },
      { label: "Sphinx", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Sphinx" }] },
      { label: "Leviathan", effects: [{ type: "stat", stat: "dur", delta: 3, reason: "Leviathan" }] },
      { label: "Cerberus", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Cerberus" }] },
      { label: "Unicorn", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Unicorn" }] },
      { label: "Basilisk", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Basilisk" }] }
    ]
  },

  animorph_mastery: {
    id: "animorph_mastery",
    label: "Animorph — Mastery",
    icon: "🦎",
    theme: "teal",
    segments: [
      { label: "Pets Morphing" },
      { label: "Single Morph" },
      { label: "Multiple Morphs" },
      {
        label: "Adaptive Morphing",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Adaptive Morphing" }]
      },
      {
        label: "Omni-Morph",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Omni-Morph" }]
      },
      {
        label: "True Elemental Morph",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 3, reason: "True Elemental Morph" }]
      }
    ]
  },

  cyborg_tech: {
    id: "cyborg_tech",
    label: "Cyborg — Tech Ability",
    icon: "🤖",
    theme: "blue",
    segments: [
      { label: "Quantum Processing", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Quantum Processing" }] },
      { label: "Force Field", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Force Field" }] },
      { label: "Gravity Manipulation", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Gravity Manipulation" }] },
      { label: "Nanite Regeneration", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Nanite Regen" }] },
      {
        label: "Power Absorption",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Power Absorption" }]
      },
      { label: "Holographic Projection" },
      { label: "Sonic Disruption" },
      { label: "Energy Blast", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Energy Blast" }] },
      { label: "Adaptive Camouflage", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Adaptive Camouflage" }] }
    ]
  },

  cyborg_integration: {
    id: "cyborg_integration",
    label: "Cyborg — Integrated With",
    icon: "🧩",
    theme: "gray",
    segments: [
      "Human",
      "Elf",
      "Dwarf",
      "Orc",
      "Angel",
      "Demon",
      "Golem",
      "Fey",
      "Elemental",
      "Giant",
      "Mythical Beast",
      "Vampire",
      "Merfolk",
      "Animorph",
      "Beastfolk",
      "Titan"
    ].map((s) => ({ label: s }))
  },

  angel_order: {
    id: "angel_order",
    label: "Angel — Angelic Order",
    icon: "😇",
    theme: "teal",
    segments: [
      { label: "Cupid" },
      { label: "Messenger" },
      { label: "Valkyrie" },
      { label: "Archangel", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Archangel" }] }
    ]
  },

  angel_abilities: {
    id: "angel_abilities",
    label: "Angel — Angelic Abilities",
    icon: "✨",
    theme: "teal",
    segments: [
      { label: "Healing Touch" },
      { label: "Voice of Command", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Voice of Command" }] },
      { label: "Resurrection" },
      { label: "Celestial Portal", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Celestial Portal" }] },
      { label: "Sacred Fire", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Sacred Fire" }] },
      { label: "Celestial Storm", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Celestial Storm" }] },
      { label: "Light Manipulation" },
      { label: "Chrono Grace", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Chrono Grace" }] },
      {
        label: "Reality Wave",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Reality Wave" }]
      }
    ]
  },

  demon_gift: {
    id: "demon_gift",
    label: "Demon — Demonic Gift",
    icon: "😈",
    theme: "red",
    segments: [
      { label: "Shadow Blend", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Shadow Blend" }] },
      { label: "Dark Healing" },
      { label: "Cursed Touch", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Cursed Touch" }] },
      { label: "Hellish Flame", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Hellish Flame" }] },
      { label: "Corruption Aura", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Corruption Aura" }] },
      { label: "Demonic Possession" },
      { label: "Hellgate Opening" },
      { label: "Pact Making" },
      { label: "Soul Harvest", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Soul Harvest" }] },
      { label: "Darkness Manipulation" },
      { label: "Abyssal Chains" },
      {
        label: "Reality Corruption",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Reality Corruption" }]
      },
      {
        label: "Primordial Annihilation",
        effects: [{ type: "stat", stat: "str", delta: 3, reason: "Primordial Annihilation" }]
      }
    ]
  },

  devil_sin: {
    id: "devil_sin",
    label: "Devil — Sin",
    icon: "🔥",
    theme: "red",
    segments: [
      "Wrath",
      "Pride",
      "Gluttony",
      "Sloth",
      "Greed",
      "Envy",
      "Lust"
    ].map((s) => ({ label: s }))
  },

  dragonslayer_rank: {
    id: "dragonslayer_rank",
    label: "Dragon Slayer — Rank",
    icon: "🐉",
    theme: "red",
    segments: [
      { label: "Iron Claw" },
      { label: "Quartz Knight" },
      { label: "Bronze Berserker" },
      { label: "Emerald Prowler" },
      { label: "Jade Juggernaut" },
      { label: "Ruby Renegade" },
      { label: "Obsidian Overlord", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Obsidian Overlord" }] },
      { label: "Diamond Dragoon", effects: [{ type: "stat", stat: "str", delta: 3, reason: "Diamond Dragoon" }] }
    ]
  },

  dragonslayer_weapon: {
    id: "dragonslayer_weapon",
    label: "Dragon Slayer — Mythical Weapon",
    icon: "⚔️",
    theme: "purple",
    segments: [
      "Starshard Bow",
      "Voidbreaker Maul",
      "Drakefist Gauntlet",
      "Draconic Doomhammer",
      "Inferno Spear",
      "Tidal Glaive",
      "Dragonheart Shield",
      "Skyrender Axe",
      "Eclipse Sword",
      "Scalebreaker Mace",
      "Eternal Armor",
      "Soulchain Flail"
    ].map((s) => ({ label: s }))
  },

  reincarnation_identity: {
    id: "reincarnation_identity",
    label: "Reincarnation — Identity",
    icon: "♻️",
    theme: "gray",
    segments: [
      { label: "Achilles" },
      { label: "The Wanderer" },
      { label: "The Exile" },
      { label: "The Veteran" },
      { label: "The Duelist" },
      { label: "The Trickster" },
      { label: "The Silent" },
      { label: "The Scholar", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "The Scholar" }] },
      { label: "The Reclaimer" }
    ]
  },

  spirit_pact: {
    id: "spirit_pact",
    label: "Spirit — Pact",
    icon: "👻",
    theme: "gray",
    segments: [
      { label: "Revives Previous Character" }
    ]
  },

  cosmic_conquest: {
    id: "cosmic_conquest",
    label: "Cosmic Warrior — Conquest",
    icon: "🪐",
    theme: "blue",
    segments: [
      { label: "Asteroid Conqueror" },
      { label: "Planet Conqueror" },
      { label: "Solar System Conqueror", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Solar System Conqueror" }] },
      { label: "Galaxy Conqueror", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Galaxy Conqueror" }] },
      {
        label: "Elemental Conqueror",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Elemental Conqueror" }]
      }
    ]
  },

  demigod_class: {
    id: "demigod_class",
    label: "Demi-God — Class",
    icon: "🏛️",
    theme: "gold",
    segments: [
      { label: "Champion's Blood", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Champion's Blood" }] },
      {
        label: "Divine Child",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Divine Child" }]
      },
      {
        label: "Chosen One",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Demi-God Chosen One" }]
      }
    ]
  },

  demigod_lineage: {
    id: "demigod_lineage",
    label: "Demi-God — Lineage",
    icon: "🧿",
    theme: "gold",
    segments: [
      "Astraion",
      "Nyxara",
      "Solvath",
      "Vyrion",
      "Kaelith",
      "Zephyra",
      "Morcant",
      "Thalor",
      "Ilyra",
      "Voruun",
      "Seraphel",
      "Erebosyn",
      "Caldrin",
      "Orphayne",
      "Lunaris",
      "Valkaine",
      "Dravenn",
      "Aetherion"
    ].map((s) => ({ label: s }))
  },

god_type: {
    id: "god_type",
    label: "God — Type",
    icon: "⭐",
    theme: "gold",
    segments: [
      "Life",
      "Animals",
      "Space",
      "Chaos",
      "War",
      "Love",
      "Death",
      "Wind",
      "Fire",
      "Water",
      "Thunder",
      "Wisdom",
      "Earth",
      "Mischief",
      "God of Gods"
    ].map((s) => ({ label: s }))
  },

  god_power: {
    id: "god_power",
    label: "God — Signature Power",
    icon: "⚡",
    theme: "gold",
    segments: [
      { label: "Invincible", effects: [{ type: "stat", stat: "dur", delta: 3, reason: "Invincible" }] },
      { label: "Omniscient Glimpse", effects: [{ type: "stat", stat: "iq", delta: 3, reason: "Omniscient Glimpse" }] },
      { label: "Light-Speed Dominion", effects: [{ type: "stat", stat: "spd", delta: 3, reason: "Light-Speed Dominion" }] },
      { label: "Infinite Strength", effects: [{ type: "stat", stat: "str", delta: 3, reason: "Infinite Strength" }] },
      { label: "Time Travel", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Time Travel" }] },
      { label: "Teleportation", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Teleportation" }] },
      { label: "Summoning", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Summoning" }] },
      {
        label: "Reality Warping",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 3, reason: "Reality Warping" }]
      },
      {
        label: "Necromancy + Shadow Control",
        effects: [
          { type: "stat", stat: "dur", delta: 2, reason: "Shadow Control" },
          { type: "stat", stat: "str", delta: 1, reason: "Necromancy" }
        ]
      },
      { label: "Force Field + Gravity Control", effects: [{ type: "stat", stat: "dur", delta: 3, reason: "Force Field" }] }
    ]
  },

  primordial_power: {
    id: "primordial_power",
    label: "Primordial — Power",
    icon: "🕳️",
    theme: "blue",
    segments: ["Time", "Eternity", "Reality", "Void", "Order", "Chaos", "Life", "Death"].map((s) => ({ label: s }))
  },

  titan_domain: {
    id: "titan_domain",
    label: "Titan — Domain",
    icon: "🏔️",
    theme: "blue",
    segments: [
      { label: "Stone", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Titan of Stone" }] },
      {
        label: "Storm",
        effects: [
          { type: "stat", stat: "spd", delta: 1, reason: "Titan of Storm" },
          { type: "stat", stat: "str", delta: 1, reason: "Titan of Storm" }
        ]
      },
      { label: "Sea", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Titan of Sea" }] },
      { label: "Inferno", effects: [{ type: "stat", stat: "str", delta: 2, reason: "Titan of Inferno" }] },
      { label: "Sky", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Titan of Sky" }] },
      {
        label: "Void",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 2, reason: "Titan of Void" }]
      }
    ]
  },

  titan_vow: {
    id: "titan_vow",
    label: "Titan — Vow",
    icon: "📜",
    theme: "gold",
    segments: [
      { label: "Guardian Oath", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Guardian Oath" }] },
      { label: "Conqueror's Oath", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Conqueror's Oath" }] },
      { label: "Silent Oath", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Silent Oath" }] },
      { label: "Swift Oath", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Swift Oath" }] }
    ]
  },

  beastfolk_aspect: {
    id: "beastfolk_aspect",
    label: "Beastfolk — Aspect",
    icon: "🐾",
    theme: "teal",
    segments: [
      { label: "Wolf", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Wolf Aspect" }] },
      { label: "Bear", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Bear Aspect" }] },
      { label: "Panther", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Panther Aspect" }] },
      { label: "Eagle", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Eagle Aspect" }] },
      { label: "Serpent", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Serpent Aspect" }] },
      { label: "Bull", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Bull Aspect" }] },
      { label: "Fox", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Fox Aspect" }] },
      { label: "Shark", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Shark Aspect" }] }
    ]
  },

  beastfolk_instinct: {
    id: "beastfolk_instinct",
    label: "Beastfolk — Instinct",
    icon: "🩶",
    theme: "gray",
    segments: [
      { label: "Hunter's Focus", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Hunter's Focus" }] },
      { label: "Alpha Pressure", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Alpha Pressure" }] },
      { label: "Pack Reflex", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Pack Reflex" }] },
      { label: "Iron Hide", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Iron Hide" }] }
    ]
  },

  dragon_type: {
    id: "dragon_type",
    label: "Dragon — Type",
    icon: "🐲",
    theme: "red",
    segments: [
      { label: "Fire" },
      { label: "Frost" },
      { label: "Storm" },
      { label: "Venom" },
      { label: "Astral", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Astral Dragon" }] },
      {
        label: "Void",
        effects: [{ type: "statRandom", choices: ["str", "spd", "dur", "iq"], delta: 1, reason: "Void Dragon" }]
      }
    ]
  },

  siren_song: {
    id: "siren_song",
    label: "Siren — Song",
    icon: "🎶",
    theme: "purple",
    segments: [
      { label: "Charm" },
      { label: "Dread" },
      { label: "Sleep" },
      { label: "Madness", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Madness Song" }] },
      { label: "Truth", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Truth Song" }] }
    ]
  },

  android_model: {
    id: "android_model",
    label: "Android — Model",
    icon: "🧠",
    theme: "gray",
    segments: [
      { label: "Scout", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Scout Model" }] },
      { label: "Guardian", effects: [{ type: "stat", stat: "dur", delta: 2, reason: "Guardian Model" }] },
      { label: "Assassin", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Assassin Model" }] },
      { label: "Oracle", effects: [{ type: "stat", stat: "iq", delta: 2, reason: "Oracle Model" }] },
      { label: "Warden", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Warden Model" }] }
    ]
  },

  centaur_crest: {
    id: "centaur_crest",
    label: "Centaur — Crest",
    icon: "🏹",
    theme: "teal",
    segments: ["Forest", "Steppe", "Desert", "Highland", "Night"].map((s) => ({ label: s }))
  },

  genie_element: {
    id: "genie_element",
    label: "Genie — Element",
    icon: "🫧",
    theme: "blue",
    segments: [
      { label: "Wind", effects: [{ type: "stat", stat: "spd", delta: 1, reason: "Wind Genie" }] },
      { label: "Fire", effects: [{ type: "stat", stat: "str", delta: 1, reason: "Fire Genie" }] },
      { label: "Water", effects: [{ type: "stat", stat: "dur", delta: 1, reason: "Water Genie" }] },
      { label: "Sand", effects: [{ type: "stat", stat: "iq", delta: 1, reason: "Sand Genie" }] },
      { label: "Lightning", effects: [{ type: "stat", stat: "spd", delta: 2, reason: "Lightning Genie" }] }
    ]
  },

  // =========================
  // STATS (base tiers)
  // =========================
  strength: {
    id: "strength",
    label: "3. Strength",
    icon: "🏋️",
    theme: "purple",
    segments: ["Mid", "Peak Human", "Superhuman", "Herculean", "Cosmic", "Universal", "Transcendent"].map((s) => ({ label: s }))
  },

  speed: {
    id: "speed",
    label: "4. Speed",
    icon: "⚡",
    theme: "blue",
    segments: ["Mid", "Peak Human", "Superhuman", "Herculean", "Cosmic", "Universal", "Transcendent"].map((s) => ({ label: s }))
  },

  durability: {
    id: "durability",
    label: "5. Durability",
    icon: "🛡️",
    theme: "red",
    segments: ["Mid", "Peak Human", "Superhuman", "Herculean", "Cosmic", "Universal", "Transcendent"].map((s) => ({ label: s }))
  },

  iq: {
    id: "iq",
    label: "6. IQ",
    icon: "🧠",
    theme: "purple",
    segments: ["Mid", "Peak Human", "Superhuman", "Herculean", "Cosmic", "Universal", "Transcendent"].map((s) => ({ label: s }))
  },

  // =========================
  // COMBAT / POWERS
  // =========================
  weapon: {
    id: "weapon",
    label: "8. Weapon",
    icon: "⚔️",
    theme: "red",
    segments: [
      "Sword",
      "Spear",
      "Dagger",
      "Axe",
      "Throwing Axe",
      "Hammer",
      "Mace",
      "Scythe",
      "Bow",
      "Crossbow",
      "Boomerang",
      "Staff",
      "Wand",
      "Chain",
      "Whip",
      "Shield",
      "Gauntlets",
      "Unarmed",
      "Twin Blades",
      "Halberd",
      "Trident",
      "Kusarigama",
      "Katana",
      "Greatsword",
      "Rapier",
      "Gunlance",
      "Chakram",
      "Sling",
      "Throwing Knives",
      "Relic Weapon"
    ].map((s) => ({ label: s }))
  },

  weapon_mastery: {
    id: "weapon_mastery",
    label: "9. Weapon Mastery",
    icon: "🗡️",
    theme: "red",
    segments: [
      { label: "Novice" },
      { label: "Apprentice" },
      { label: "Adept" },
      { label: "Expert" },
      { label: "Master" },
      { label: "Grandmaster" },
      { label: "Universal" },
      { label: "Transcendent", weight: 1 }
    ]
  },

  enchantment: {
    id: "enchantment",
    label: "10. Enchantment",
    icon: "💎",
    theme: "blue",
    segments: [
      "Enlargement",
      "Sharpening",
      "Soulbind",
      "Unbreakable",
      "Phase Edge",
      "Flame Tongue",
      "Frostbite",
      "Stormcall",
      "Venom Kiss",
      "Gravity Anchor",
      "Bloodlust",
      "Echo Strike",
      "Time Stitch",
      "Mirror Rift",
      "Stunlock",
      "Luck Siphon",
      "Responsive",
      "Adaptive",
      "Overclock",
      "Silent Step",
      "True Aim",
      "Return-to-Hand",
      "Life Steal",
      "Mana Drain",
      "Ward Pulse",
      "Null Field",
      "Sunder",
      "Armor Pierce",
      "Rune Carving",
      "Element Infusion",
      "Shadow Coat",
      "Holy Seal",
      "Curse Brand",
      "Beacon",
      "Gale Push",
      "Stone Skin",
      "Chain Lightning",
      "Solar Flare",
      "Moonlit",
      "Doom Mark",
      "Spectral Reach",
      "Tidal Surge",
      "Mind Needle",
      "Fearmonger",
      "Purify",
      "Regenerate",
      "Blink",
      "Haste",
      "Slow",
      "Berserk",
      "Barrier",
      "Reflect",
      "Magnetize",
      "Disarm",
      "Poison Cloud",
      "Sever",
      "Astral Edge",
      "Void Edge",
      "Phoenix Ash",
      "Titan Weight",
      "Eternal"
    ].map((s) => ({ label: s }))
  },

  extra_power: {
    id: "extra_power",
    label: "11. Extra Power",
    icon: "☄️",
    theme: "purple",
    segments: [
      "Paper Manipulation",
      "Gravity Bends",
      "Time Glimpse",
      "Soul Chains",
      "Storm Calling",
      "Metal Shaping",
      "Illusion Craft",
      "Portal Mark",
      "Shadow Threads",
      "Blood Sigils",
      "Curse Weaving",
      "Void Step",
      "Mind Leech",
      "Eclipse Mantle",
      "Bone Craft",
      "Crystal Growth",
      "Sand Control",
      "Ice Sculpt",
      "Flame Spiral",
      "Thunder Brand",
      "Astral Projection",
      "Telekinesis",
      "Sound Control",
      "Plant Dominion",
      "Beast Command",
      "Light Bending",
      "Anti-Magic Pulse",
      "Regeneration Burst",
      "Reality Scratch",
      "Dimensional Pocket",
      "Copy Technique",
      "True Sight",
      "Dream Walk",
      "Poison Alchemy",
      "Radiation Touch",
      "Magnetism",
      "Water Pressure",
      "Wind Blades",
      "Earth Shatter",
      "Spirit Contract",
      "Mirror Clone"
    ].map((s) => ({ label: s }))
  },

  power_mastery: {
    id: "power_mastery",
    label: "12. Power Mastery",
    icon: "🎯",
    theme: "purple",
    segments: [
      { label: "Dormant" },
      { label: "Controlled" },
      { label: "Adept" },
      { label: "Expert" },
      { label: "Master" },
      { label: "Universal" },
      { label: "Transcendent", weight: 1 }
    ]
  },

  // =========================
  // COSMIC (factor then force)
  // =========================
  cosmic_factors: {
    id: "cosmic_factors",
    label: "⭐ Cosmic Factors",
    icon: "⭐",
    theme: "gold",
    segments: [
      { label: "Creator's Favor", effects: [{ type: "setPendingCosmicFactor", factorId: "creators_favor" }] },
      { label: "Cosmic Veil", effects: [{ type: "setPendingCosmicFactor", factorId: "cosmic_veil" }] },
      { label: "Celestial Insight", effects: [{ type: "setPendingCosmicFactor", factorId: "celestial_insight" }] },
      { label: "Ethereal Pulse", effects: [{ type: "setPendingCosmicFactor", factorId: "ethereal_pulse" }] },
      { label: "Unbreakable Will", effects: [{ type: "setPendingCosmicFactor", factorId: "unbreakable_will" }] },
      { label: "Mentor", effects: [{ type: "setPendingCosmicFactor", factorId: "mentor" }] },
      { label: "God's Gift", effects: [{ type: "setPendingCosmicFactor", factorId: "gods_gift" }] },
      { label: "Warrior's Pride", effects: [{ type: "setPendingCosmicFactor", factorId: "warrior_pride" }] },
      { label: "Titan's Resolve", effects: [{ type: "setPendingCosmicFactor", factorId: "titan_resolve" }] }
    ]
  },

  cosmic_force: {
    id: "cosmic_force",
    label: "⭐ Cosmic Force",
    icon: "⭐",
    theme: "purple",
    segments: [
      { label: "Slightly Blessed", weight: 10, effects: [{ type: "applyPendingCosmicBlessing", intensity: 1, forceLabel: "Slightly Blessed" }] },
      { label: "Blessed", weight: 6, effects: [{ type: "applyPendingCosmicBlessing", intensity: 2, forceLabel: "Blessed" }] },
      { label: "Chosen One", weight: 3, effects: [{ type: "applyPendingCosmicBlessing", intensity: 3, forceLabel: "Chosen One" }] },
      { label: "HIM", weight: 1, effects: [{ type: "applyPendingCosmicBlessing", intensity: 4, forceLabel: "HIM" }] }
    ]
  },

  // =========================
  // WEAKNESS + SUMMARY
  // =========================
  weakness: {
    id: "weakness",
    label: "13. Weakness",
    icon: "⚰️",
    theme: "gray",
    segments: [
      { label: "No Weakness", weight: 1 },
      { label: "Arrogance", weight: 6 },
      { label: "Greed", weight: 6 },
      { label: "Overconfidence", weight: 6 },
      { label: "Fragile Mind", weight: 6 },
      { label: "Slow Recovery", weight: 6 },
      { label: "Cursed Luck", weight: 6 },
      { label: "Power Drain", weight: 6 },
      { label: "Fear of Fire", weight: 6 },
      { label: "Fear of Water", weight: 6 },
      { label: "Time Limit", weight: 6 }
    ]
  },

  summary: { id: "summary", label: "Summary", icon: "📜", theme: "gray", segments: [] }
};
