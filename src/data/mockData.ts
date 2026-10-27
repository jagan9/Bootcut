import { Project, InspirationStyle, AudioTrack, MediaClip, PipelineStage } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Japan Summer Memories',
    category: 'Travel & Exploration',
    status: 'ready',
    aspectRatio: '9:16',
    duration: '0:42s',
    cutsCount: 24,
    trackName: 'Tokyo Drift Lo-Fi',
    bpm: 118,
    genre: 'Lo-Fi Chill',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaaYaKiC8sgJHXRWuCf2hU64fvmaMC1Kqcfy5vxCLy6gLogllWtiDbBJxZWl2d5ed9sHSznOj5WrZLOisfS-rHfseFuj96k4YHB2rkD_o04hRnDPkLeLiJ-32Isg51wEkPxK1HWLwiAbkIx1b-I1LE4yhm-fgt0XiL8eIcFtSX-HY_1JE1N5Z2PdpRjY2lfGOi-TjMfHOwvkXRjMelRyNivBEIDeTcwlB-mbGY8x8HqzIw_500NVyD1g',
    editedAgo: 'Edited 2h ago',
    clipsCount: 6,
    resolution: '1080p · 60fps',
    lut: 'Teal & Pink LUT',
    version: 2
  },
  {
    id: 'proj-2',
    title: 'College Farewell 2026',
    category: 'School / Memories',
    status: 'processing',
    aspectRatio: '16:9',
    duration: '1:15s',
    cutsCount: 38,
    trackName: 'Electric Nostalgia',
    bpm: 130,
    genre: 'Future Bass',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUfF9q6xyD_4AowlQb00_MYr2IUHPz06diSZb5XlHruqoff9u39h8hizS0iXMVMucUyf_PPdsdMXqTBdOEAvHbE6EvP0l1zKKzaedmdoQtwnU8ju2rh7_xAHmqxsKeN2dq7Se7m00zsW0UaJYVK5ATXZQc5P89jnnP0wVeYeFZyWV4hKXP-g6RkXIUSCGynIcdXcatD_lqybEpF02JGuXMVEEI3y_f7vxqBB64R9XjXbiQTpd9XXJXvg',
    editedAgo: 'Rendering now',
    processingProgress: 64,
    processingStep: 'Step 4 of 6 · Rendering edit 64%',
    clipsCount: 14,
    resolution: '4K UHD',
    lut: 'Golden Haze',
    version: 1
  },
  {
    id: 'proj-3',
    title: 'Mom & Dad Anniversary',
    category: 'Family Celebration',
    status: 'draft',
    aspectRatio: '1:1',
    duration: '0:50s',
    cutsCount: 16,
    trackName: 'Golden Memories',
    bpm: 92,
    genre: 'Acoustic Folk',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfp_VremsciVJcHClLmWjcV2fCI9mOsUNAS4wMXrph7KD8ZPOLxw6xmemOJD0O2jth6A1WBl0S9RJbFx_-CLju0WgnlgilvOo7o8XXaV3zINJ5g0kkGxiFoM-gPbEEgOGv_umQsmGpsG0e77HaKZKiW87aJb5Fo-kfZM8TxQss2EEn0FQEVWvY8Rdsm0xTuADMhpj0IgAKrPictwUSpMez7mnBBAqqISgmEWpZLMrf5OJL83QnLVZh2w',
    editedAgo: 'Draft saved yesterday',
    clipsCount: 8,
    resolution: '1080p',
    lut: 'Warm Candlelight',
    version: 1
  },
  {
    id: 'proj-4',
    title: 'Weekend with Friends',
    category: 'Friends / Outing',
    status: 'ready',
    aspectRatio: '9:16',
    duration: '0:28s',
    cutsCount: 18,
    trackName: 'Summer Haze',
    bpm: 124,
    genre: 'Indie Pop',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlfw3lX8PymC_vJi9nflhyTxBNuJv1FV5hyjkl1mjdYLOsslm4vNyH4Azf58JJzek2RadPSVnKw5OfC_1e0N_Cisgta3F-3xaE-05LT5dGQ5oFcHsDMpC1NCK2tVNwCItAunXYtSRs-QbQn7EHxyc2cVvpHWG82LToEeqGQXe2i50-4uGdNRhqR1YLuNVearDVmmjXtM4if2tGuWA6ceYro-jOZR5Vqs3HCMYyoYC81v7y2uwblqy7Qw',
    editedAgo: 'Edited 3 days ago',
    clipsCount: 9,
    resolution: '1080p · 60fps',
    lut: 'Sunset Glow',
    version: 1
  }
];

export const INSPIRATION_STYLES: InspirationStyle[] = [
  {
    id: 'style-1',
    name: 'Summer Drift',
    duration: '0:30s',
    bpm: 128,
    genre: 'Lo-Fi Trap',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwoWnwXrTqb5tUk97owaZ1m_Q_CzZv0NPASl3RXbA9sVFsWMHJgVJJQKmv_xKRQkf9MnVGQAvbKiyd0qufWN2S4CyMku9a5uvcg7_eTJinhEKKVD5nVmLtiqpgrJgqUDjmMFh-DYxn_CUBszBJv7pRxtITV1rXi3TiaC4lJh4bR83Jn7EROMgrzRFUiRLprziE7loAIBmCesd88TYhdp7trAHOjimyzdg6wEcg4P_j6dKZYfWzgjkTRg'
  },
  {
    id: 'style-2',
    name: 'Timeless Romance',
    duration: '1:00m',
    bpm: 92,
    genre: 'Acoustic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1n8Wdp_oV9y3LXEdQQVOhU-aEzP9aaVCAhjWJM5pAVlurd0EvY7Kz7R77BDFclvowPIfyRxgOdkr9PQ-QWJYi6_RA6bd746IOJIau5Unk46ZZj763oMhelY_vdE1ui00f7iDqXVT0feZh5vQsj46XssvK-RXVuyhEBYWLIcSX6tveSjw9PxUIyX_Yy32c147CLxp7K7qfYcYLlfO7gXJVKuEpLCSUqwnccy3WD6Jw-boM_3mLoPtig'
  },
  {
    id: 'style-3',
    name: 'Neon Phonk',
    duration: '0:15s',
    bpm: 145,
    genre: 'Bass Drop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr7INZo9QEvzVAexFDMRm9znst2CZg9RZfANk2k6UcXeJYsGT29RqFfzKoXC7SxA50px3NX3PxdJo5KBXg_x9xlcqT5joozrTkhtOiaHkSpVZpwxiHxffaazxjZhmH0f-Tn4eDZLA25doFEsuAkqfTaK0wL6FBFjyJd6MCzeO85_nhuq3u8CTvGq_iaEjTEWSUmefTvTL4q0FV_SSlQEQsMvLl7RjrVwOB5cQ5mAouy6_v44k36ctG5w'
  },
  {
    id: 'style-4',
    name: 'Cafe Aesthetic',
    duration: '0:45s',
    bpm: 110,
    genre: 'Indie Pop',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFfdgMIRqOOB8ZQSBP3I-09wnuMC8ZG53PTy87NGXgwj3PnnZJK5DFWCo-5gE33Wto7ja_0NGsYMYAeCn4qB-lGflrHiPwboQ9Q10F4hZf8uTaZLdoNF-LKeNIfgB8E9DVo09yw4Dl3DFWCS39_7oZWIaQo_7zEVYOdpSUqVkIUR29wZ8s8iYSpCfXYHbZ4YnaKcKXkWbw7Ro1vcISuu-YOLziZuSCGyTzs3ofhd2hBW7HCA-TjS-wXg'
  },
  {
    id: 'style-5',
    name: 'Drop Commercial',
    duration: '0:20s',
    bpm: 132,
    genre: 'Electro',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2KuVJ0db2-gidgvcmF8D62x7Sh_ixU_G9JtAS534GDk7Vt66whsEwCiebc6uVz9qH70zWRm7fUxyauov8RdxQU-AKHoe3XXck5ZN4ZRESL91QA6Jan36HFPcBMckI4BcjeAZZL3XVIlzajt0JxJkYvB_3iiab1s6DS5XvMiHBAFGhrDJ3_4oqrAFoOP7YUAZAoR9QkUSxlcyw4uqIEIDtvdqQQfSHsd3mKwnj6lijtoh8vMZhe6qg3g'
  }
];

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'track-1',
    name: 'Lost in Kyoto',
    genre: 'Synthwave',
    bpm: 128,
    duration: '2:48',
    hotCuts: 32
  },
  {
    id: 'track-2',
    name: 'Tokyo Drift Lo-Fi',
    genre: 'Lo-Fi Chill',
    bpm: 118,
    duration: '2:15',
    hotCuts: 24
  },
  {
    id: 'track-3',
    name: 'Cyberpunk 2088',
    genre: 'Midtempo Bass',
    bpm: 140,
    duration: '3:10',
    hotCuts: 44
  },
  {
    id: 'track-4',
    name: 'Golden Sunset Haze',
    genre: 'Melodic House',
    bpm: 124,
    duration: '2:32',
    hotCuts: 28
  },
  {
    id: 'track-5',
    name: 'Acoustic Sunrise',
    genre: 'Folk Acoustic',
    bpm: 96,
    duration: '3:05',
    hotCuts: 18
  }
];

export const INITIAL_CLIPS: MediaClip[] = [
  {
    id: 'clip-1',
    filename: 'Tokyo_Shibuya_Crossing.mp4',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgEP9U23znis51ceTMEEOTAnQLwJL6WzrCPRtphLW5T_0SzI79lw3Ds2lEKu1wggnbAsE0Xj1O7smg5aOgb-tJZ9kwpA3R-EOxHuwcRLQ6NkiHLV1_WyvpJJw0e7t-6lU_MV9-8V1xYwGRciISHeCBjmuSBkKABZigMZ7jTAns0S_pUfCu_DWh4O-3oOEoP9Yj7pTbzMnecREyOrt6dxd5CFXzdZc8cWYYll2ye0MZb_Kn6kyf_NTawQ',
    duration: '0:24',
    resolution: '4K',
    fps: 60,
    keyframes: '14 Keyframes'
  },
  {
    id: 'clip-2',
    filename: 'Fushimi_Inari_Gated.mp4',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZXemcqncbyEzC6ZtK10WnQFHOGtt6ZWwROprtk6mnrmnKUaCRXjNStptLeaQIlQLNbHZBB37e4Z0IsksCbLcFnHVyERY28VgtOmbaelWEppgR6CdqZg9OodF5UDeniibZd8JIE-ehsbswqNwffwWhLy3O-CZBq5FNhKUD3e0C89mJTFZONqDe-6AEsfI_RYEALeGpaskLuPokt7iC8MK-XolskIGSDJBk-zVwhQvLvl546LcWyNGRQ',
    duration: '0:18',
    resolution: '1080p',
    fps: 120,
    keyframes: 'Smooth Motion'
  },
  {
    id: 'clip-3',
    filename: 'Ramen_Street_Food.jpg',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpMj_lOp4mNwEtCpU3fdDM0reSj2-ZaqOeLfFHjgBW1BQewud4nNvaVK1DItA-WGOsfbGVOumoTFdq4l92LgwuNBdIpYIgwy-dlTo0t-y74vQwRbkcjBwKaM-8f28kJE1wjaiGC9-_26UADWN4GQhprnAB2GO6VBSlfXv5T-HM1g9Z33PBS5Wk3RjMkbWFPPfrUAUE1ws6yiBdNeWMLbgz2etTpiKfWj-8HJn27xX-rDBGrl3FiOnVJw',
    duration: 'HEIC',
    resolution: 'HDR 48MP',
    fps: 0,
    keyframes: 'Ken Burns 2.5s'
  }
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    title: 'Validating media files',
    status: 'completed',
    time: '0.8s',
    details: '6 source streams verified (H.265 / 4K 60fps)'
  },
  {
    id: 2,
    title: 'Analyzing clips & scene cuts',
    status: 'completed',
    time: '3.2s',
    details: '31 candidate action moments detected'
  },
  {
    id: 3,
    title: 'Analyzing music & beat points',
    status: 'completed',
    time: '1.4s',
    details: 'Transients locked to bass drops & snares'
  },
  {
    id: 4,
    title: 'Building edit & matching beats',
    status: 'active',
    badge: 'Active',
    details: 'Matching 14 video cut points to kick drums and chorus drops'
  },
  {
    id: 5,
    title: 'Rendering & color grading',
    status: 'queued',
    badge: 'Queued',
    details: 'Applying \'Tokyo Neon\' LUT preset'
  },
  {
    id: 6,
    title: 'Quality check & audio normalization',
    status: 'pending',
    badge: 'Pending',
    details: 'EBU R128 loudness conforming'
  },
  {
    id: 7,
    title: 'Ready for preview',
    status: 'pending',
    badge: 'Final',
    details: 'Instant scrubber playback in BeatCut Studio'
  }
];
