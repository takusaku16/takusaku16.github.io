---
layout: page
title: Rust
toc: true
---

## Rust
　Rust

### 思い出シート
　忘れても振り返ればそこに確かにある思い出。

- println! : ! は マクロ？
  - {:?} : 
  - {:#?} : 
- xxxx.collect() : コレクションを作る？
- エラー
  - except : 
  - ? : エラー値を返す
  - |err| : クロージャー
  - unwrap : 包んでいる中身を返す
  - unwrap_or_else
  - is_err

## Rust + ゲームプログラミング
　ゲームエンジンを使うか、ライブラリを叩くか、APIを直で叩くか。

### ゲームエンジン
- [Amethyst](https://amethyst.rs/) : データ指向のゲームエンジン
- [Piston](https://github.com/PistonDevelopers/piston) : モジュール方式のゲームエンジン
- [ggez](https://github.com/ggez/ggez) : 軽量なgfx-rsベースの2Dゲームエンジン
- [Beby](https://github.com/bevyengine/bevy) : データ駆動型ゲームエンジン
- [Victorem](https://github.com/VictoremWinbringer/Victorem) : シンプルな2Dおよび3Dオンラインゲームのプロトタイプを作成するための簡単なUDPゲームサーバーおよびUDPクライアントフレームワーク
- [unrsut](https://github.com/unrust/unrust) : 純粋なrustベースの（webgl 2.0 /ネイティブ）ゲームエンジン
- [Haromoy](https://github.com/StarArawn/harmony) : wgpuを使用する最新の3D / 2Dゲームエンジン
- [oxidator](https://github.com/Ruddle/oxidator) : RustとWebGPUで作成されたリアルタイム戦略ゲーム/エンジン

### ECS
- [specs](https://github.com/amethyst/specs) : スペックパラレルECS
- [legion](https://github.com/amethyst/legion) : 最小限のボイラープレートを備えた機能豊富な高性能ECSライブラリ

### ゲームエンジン・ライブラリ・グラフィックスAPI関係
　対象にした範囲が広すぎたので二つに分割して図式。bind とか wrapper とかよく分からなかったけど、いろいろ見たおかげで掴めた気がする。というかライブラリ多すぎ。javascriptはこれの比ではないんだろうと思うけど、にしても多い。

　図に関して、図が煩雑になるため記載を避けた要素がいくつかあり。また、いくつかについてはカテゴライズに迷ったけど投げ入れてるのもあるので、視点や観点が変わると変わりうる。とりあえず、私的にこう思ったよの集合体としての図。

#### ゲームエンジン図🖼
<div style="height: 236px; overflow: hidden;"><div style="margin-top:-130px;"><div class="mermaid">
graph TD
subgraph グラフィックスAPI
    SomeGraphicsAPI
    WebGPU
    WebGL
end
subgraph ゲームエンジン
    Godot
    libtcod
    Voxlap
end
subgraph Rustライブラリ
    gfx-rs/gfx --> SomeGraphicsAPI
    subgraph _WebGPU
        gfx-rs/wgpu --> WebGPU
    end
end
subgraph "Rustフレームワーク(ECS)"
    BebyECS
    legion
    Specs
end
subgraph Rustゲームエンジン
    piston
    Victorem
    Beby --> BebyECS
    amethyst --> Specs
    amethyst --> gfx-rs/gfx
    unrsut --> WebGL
    Haromoy --> WebGPU
    oxidator --> WebGPU
    ggez --> gfx-rs/gfx
    godot-rs --binding--> Godot
    tcod-rs --binding--> libtcod
    rust-voxlap --binding--> Voxlap
end
</div></div></div>

#### ライブラリ図🖼
<div style="height: 300px; overflow: hidden;"><div style="margin-top:-220px;"><div class="mermaid">
graph TD
subgraph グラフィックスAPI
    SomeGraphicsAPI
    OpenGL
    Vulkan
    WebGPU
end
subgraph 開発ライブラリ_low
    subgraph 2D
        Cairo
        NanoVG --> OpenGL
    end
    subgraph ソフトウェアライブラリ
        SDL2
        SDL
    end
end
subgraph 開発ライブラリ_high
    subgraph ゲームライブラリ    
        Allegro
    end
    Corange --> SDL
    Corange --> OpenGL
    SFML
end
subgraph Rustライブラリ
    cairo --binding--> Cairo
    Corange-rs --binding--> Corange
    gfx-rs/gfx --> SomeGraphicsAPI
    rust-sdl2 --binding--> SDL2
    nanovg-rs --binding--> NanoVG
    RustAllegro --binding--> Allegro
    rust-sfml --binding--> SFML
    subgraph _OpenGL
        gl-rs --binding--> OpenGL
        kiss3d --> OpenGL
        glow --> OpenGL
    end
    subgraph _Vulkan
        Vulkano --wrapper--> Vulkan
        Ash --wrapper--> Vulkan
    end
    subgraph _WebGPU
        gfx-rs/wgpu --> WebGPU
    end
end
</div></div></div>

## Rust関連のサイト
### ゲームを定期公開しているさいと
- [rust-gamedev](https://rust-gamedev.github.io/)

### Rustライブラリをまとめてくれてるページ
- [awesome-rust](https://github.com/rust-unofficial/awesome-rust)
