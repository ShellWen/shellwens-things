---
title: 'Jetpack Compose 适配 Android 原生滚动截图'
description: '探索如何在 Jetpack Compose 中优雅地实现滚动截图功能，解决 FAB 等组件在长截图时的显示问题'
pubDate: '2025-06-24'
updatedDate: '2025-06-24'
category: android
# tags: android, compose
---

## 背景

尽管国内 Android OEM 厂商多年前就已支持滚动截图（长截图）功能，但 Android 官方（AOSP）直到 API Level 31（Android 12）才正式推出官方的滚动截图实现。

相比于此前国内 OEM 厂商相对粗糙的实现方式，AOSP 的官方实现更加精细化：

- **要求 App 提供滚动区域的尺寸信息**
- **支持滚动开始和结束时的回调机制**
- **允许 App 更精确地控制滚动截图的时机和行为**

## View 系统 vs Compose

在传统的 Android View 系统中，滚动截图的回调接口为 `ScrollCaptureCallback`[^1]。

然而，当我们转向 Jetpack Compose 时，会发现：

- **缺少官方文档**：互联网上几乎找不到关于 Compose 滚动截图 API 的相关资料
- **功能已支持**：Compose 的 `Column` 和 `LazyColumn` 实际上已经支持滚动截图
- **API 不明确**：没有直接暴露用于精细控制滚动截图行为的 API

## 实际问题

在没有特殊适配的情况下，Compose 的滚动截图功能看似正常工作。但在实际使用中，我发现了一个问题：

**悬浮操作按钮（FAB）在滚动截图时不会自动隐藏，导致截图中出现残缺的 FAB，遮挡了下方的内容。**

## 解决方案

经过深入的源码研究，我发现 Compose 实际上已经提供了相应的 API，只是从未在官方文档中明确提及，甚至连 Release Notes 都没有记录。

这个 API 就是 `LocalScrollCaptureInProgress`[^2]。

### 使用方法

```kotlin
@Composable
fun MyScreen() {
    val scrollCaptureInProgress = LocalScrollCaptureInProgress.current

    Scaffold(
        floatingActionButton = {
            if (!scrollCaptureInProgress) {
                FloatingActionButton(onClick = { /* ... */ }) {
                    // 当滚动截图进行时，FAB 会自动隐藏
                }
            }
        }
    ) {
        // 页面内容
    }
}
```

### 工作原理

`LocalScrollCaptureInProgress` 是一个 `CompositionLocal`，它会在滚动截图过程中自动更新状态：

- **滚动截图开始时**：值变为 `true`
- **滚动截图结束时**：值变为 `false`
- **组件响应**：通过监听这个状态，我们可以动态控制 UI 组件的显示和隐藏

## 总结

虽然 Compose 的滚动截图功能相对隐蔽，但通过 `LocalScrollCaptureInProgress` 这个未公开文档化的 API，我们可以实现更加精细的滚动截图控制，确保用户获得完美的长截图体验。

---

[^1]: [ScrollCaptureCallback - Android Developers](https://developer.android.com/reference/android/view/ScrollCaptureCallback)

[^2]: [LocalScrollCaptureInProgress - Android Developers](<https://developer.android.com/reference/kotlin/androidx/compose/ui/platform/package-summary#LocalScrollCaptureInProgress()>)，于 Compose UI 1.7.0 添加，Release Notes 中未提及，首次出现在 [androidx/platform/frameworks/support](https://cs.android.com/androidx/platform/frameworks/support/+/78f925fbc1cfe355cc63829b87a95c2e65ff7e78)
